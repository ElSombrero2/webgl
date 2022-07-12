async function main(instance){
    const search = new URLSearchParams(location.search)
    const token = search.get('token')    
    const user = await axios.get('https://back-immochv2.my-preprod.space/api/immo/v2/public/user_info', {headers: {'Authorization': 'Bearer ' + token}})
    console.log(user.data.data)
    instance.SendMessage('MainUI', 'SetUser', JSON.stringify(user.data.data))
}