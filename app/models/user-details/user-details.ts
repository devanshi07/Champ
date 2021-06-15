import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserDetailsModel = types
  .model("UserDetails")
  .props({
    userEmail: types.optional(types.string,""),
    userName: types.optional(types.string,""),
    dateOfBirth: types.optional(types.string,""),
    profileUrl: types.optional(types.string,""),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    
    
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserDetailsType = Instance<typeof UserDetailsModel>
export interface UserDetails extends UserDetailsType {}
type UserDetailsSnapshotType = SnapshotOut<typeof UserDetailsModel>
export interface UserDetailsSnapshot extends UserDetailsSnapshotType {}
