const { SchemaDirectiveVisitor, ForbiddenError } = require('apollo-server-koa');

// https://blog.apollographql.com/reusable-graphql-schema-directives-131fb3a177d1

class HackathonDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredHackathonStatus = this.args.requires;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredHackathonStatus = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve } = field;

      field.resolve = async function(...args) {
        const requiredStatus =
          field._requiredHackathonStatus || objectType._requiredHackathonStatus;

        if (!requiredStatus) {
          return resolve.apply(this, args);
        }

        const hackathon = args[2].state.hackathon;
        if (!hackathon || !hackathon.hasStatus(requiredStatus)) {
          throw new ForbiddenError();
        }

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = HackathonDirective;
