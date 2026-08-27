import MyAccount from "./my-account";

export function meta() {
  return [{ title: "My Account | Transafrica Medical" }, { name: "description", content: "Manage your customer account" }];
}

export default function CustomerAccount() {
  return <MyAccount customer />;
}
