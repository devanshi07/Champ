import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";
import { ParentCategoryDetailsModel } from "../parent-category-details/parent-category-details";
/**
 * Model description here for TypeScript hints.
 */
// const api = new Api()
export const ParentCategoryStoreModel = types
  .model("ParentCategoryStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    parentCategoryDetails: types.optional(types.frozen(), []),
    maxParentId: types.optional(types.number,3),
  })
  .extend(withEnvironment)
  .views(self => ({

  }))
 // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    
    getParentCategoryData: flow(function* getParentCategoryData(parentId: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getParentCategory(parentId);
        if (res.kind === "ok" && res.status == 200) {
          self.isLoading = false;
          self.parentCategoryDetails = res.parentCategory.data
          return { response: true, message: "Success." };
        }
        else {
          self.isLoading = false;
          return { response: false, message: "Something went wrong." };
        }
      } catch (error) {
        self.isLoading = false;
        return { response: false, message: "Something went wrong." };
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ParentCategoryStoreType = Instance<typeof ParentCategoryStoreModel>
export interface ParentCategoryStore extends ParentCategoryStoreType { }
type ParentCategoryStoreSnapshotType = SnapshotOut<typeof ParentCategoryStoreModel>
export interface ParentCategoryStoreSnapshot extends ParentCategoryStoreSnapshotType { }
