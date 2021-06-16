import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SubCategoryDetailsModel } from "../sub-category-details/sub-category-details"

/**
 * Model description here for TypeScript hints.
 */
export const ParentCategoryDetailsModel = types
  .model("ParentCategoryDetails")
  .props({
    id:types.optional(types.number,0),
    parent_id:types.optional(types.number,0),
    name:types.optional(types.string,""),
    has_child:types.optional(types.boolean,false),
    children:types.optional(types.frozen(),[]),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ParentCategoryDetailsType = Instance<typeof ParentCategoryDetailsModel>
export interface ParentCategoryDetails extends ParentCategoryDetailsType {}
type ParentCategoryDetailsSnapshotType = SnapshotOut<typeof ParentCategoryDetailsModel>
export interface ParentCategoryDetailsSnapshot extends ParentCategoryDetailsSnapshotType {}
