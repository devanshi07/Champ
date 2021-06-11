import { Instance, SnapshotOut, types } from "mobx-state-tree"
/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLogin: types.optional(types.boolean,false),
    userEmail: types.optional(types.string,""),
    userName: types.optional(types.string,""),
    
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    updateLoginStatus(value:boolean) {
      self.isLogin = value
    },
    updateUserDetails(email: string,name:string){
      self.userEmail = email
      self.userName = name
      // console.log("name: ",self.userName)
      // console.log("email ",self.userEmail)
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
