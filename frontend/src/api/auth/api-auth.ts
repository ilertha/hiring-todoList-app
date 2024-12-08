import endpoint from "../../config/config";

const signout = async () => {
  try {
    let response = await fetch(`${endpoint}/auth/logout`, { method: 'GET' })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  signout
}