const id = document.getElementById("id")
const name = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")

async function main(){
    try{
        const search = new URLSearchParams(location.search)
        const token = search.get('token')    
        const user = await axios.get('https://back-immochv2.my-preprod.space/api/immo/v2/public/user_info', {headers: {'Authorization': 'Bearer ' + token}})
        id.innerHTML = user.data.data.id
        name.innerHTML = user.data.data.firstname + ' ' + user.data.data.name 
        email.innerHTML = user.data.data.email
        phone.innerHTML = user.data.data.telephone
        const modal = document.getElementById('modal')  
        const instance = new bootstrap.Modal(modal, {keyboard: false})
        instance.show()
    }catch(e){ 
        const modal = document.getElementById('error')  
        const instance = new bootstrap.Modal(modal, {keyboard: false})
        instance.show()
     }
}