export const User = () => {
    if(localStorage.getItem('user')){
    return JSON.parse(localStorage.getItem('user'))
      }
}