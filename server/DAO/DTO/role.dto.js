export class RoleDTO {
  constructor(role) {
    this.id = role._id
    this.name = role.name
    this.permissions = role.permissions.map((permission) => ({
      module: permission.module,
      actions: permission.actions,
    }))
  }
}
