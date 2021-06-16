import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SubCategoryDetailsModel = types
  .model("SubCategoryDetails")
  .props({
    id:types.optional(types.number,0),
    parent_id:types.optional(types.number,0),
    name:types.optional(types.string,""),
    icon: types.optional(types.string,""),
    type: types.optional(types.string,""),
    round: types.optional(types.string,""),
    round_time:types.optional(types.string,""),
    rest_time:types.optional(types.string,""),
    workout_setting:types.optional(types.boolean,false),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type SubCategoryDetailsType = Instance<typeof SubCategoryDetailsModel>
export interface SubCategoryDetails extends SubCategoryDetailsType {}
type SubCategoryDetailsSnapshotType = SnapshotOut<typeof SubCategoryDetailsModel>
export interface SubCategoryDetailsSnapshot extends SubCategoryDetailsSnapshotType {}
