import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserDetailsModel } from "../user-details/user-details"
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLogin: types.optional(types.boolean,false),
    userDetails: types.optional(UserDetailsModel,{})
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    updateUserDetails(value:any){
      self.isLogin=true
      self.userDetails.userEmail=value.email
      self.userDetails.userName = value.name
      self.userDetails.dateOfBirth = value.dateOfBirth
      self.userDetails.profileUrl = value.url
    },
    removeAccess(){
      self.isLogin=false
      self.userDetails.userEmail=""
      self.userDetails.userName = ""
      self.userDetails.dateOfBirth = ""
      self.userDetails.profileUrl = ""
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
