import { Instance, SnapshotOut, types,flow } from "mobx-state-tree"
import { Api } from "../../services/api";

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
export const ParentCategoryStoreModel = types
  .model("ParentCategoryStore")
  .props({})
  .views(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getParentCategoryData: flow(function* getParentCategoryData(parentId: number) {
      try {
        const res = yield api.getParentCategory(parentId);
        console.log("res",res)
        if (res.kind === "ok" && res.data.status == 200) {
          return { response: true, message: "Success." };
         
        }
        else {
          return { response: false, message: "Something went wrong." };
        }
      } catch (error) {
        console.log("parent error ",error)
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
export interface ParentCategoryStore extends ParentCategoryStoreType {}
type ParentCategoryStoreSnapshotType = SnapshotOut<typeof ParentCategoryStoreModel>
export interface ParentCategoryStoreSnapshot extends ParentCategoryStoreSnapshotType {}
