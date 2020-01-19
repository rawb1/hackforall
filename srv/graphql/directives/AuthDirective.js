const {
  AuthenticationError,
  SchemaDirectiveVisitor
} = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');

// source : https://jkettmann.com/authorization-with-graphql-and-custom-directives/

const assertOwner = (typename, user, data) => {
  if (typename === 'Message' && user.id !== data.receiverId) {
    throw new AuthenticationError('You need to be the receiver of the message');
  }
};

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function(...args) {
      const context = args[2];
      const user = context.user || {};
      const requiresOwner = requiredRole === 'OWNER';
      const isUnauthorized = !requiresOwner && user.role !== requiredRole;

      if (isUnauthorized) {
        throw new AuthenticationError(
          `You need following role: ${requiredRole}`
        );
      }

      const data = await originalResolve.apply(this, args);

      if (requiresOwner) {
        assertOwner(field.type.name, user, data);
      }

      return data;
    };
  }
}

module.exports = AuthDirective;
