const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require('apollo-server-koa');

// https://blog.apollographql.com/reusable-graphql-schema-directives-131fb3a177d1

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve } = field;

      field.resolve = async function(...args) {
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const user = args[2].state.user;
        if (!user || !user.hasRole(requiredRole)) {
          throw new AuthenticationError('not authorized');
        }

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = AuthDirective;
