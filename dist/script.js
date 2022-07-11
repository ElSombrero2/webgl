async function main(unityInstance){
    try{
        const res = await axios.get('/token')
        const data = res.data
        const user = await axios.get('https://back-immochv2.my-preprod.space/api/immo/v2/public/user_info', {headers: {'Authorization': 'Bearer ' + data.token}})
        console.log(user.data.data)
        unityInstance.SendMessage('Main Camera', 'SetUser', JSON.stringify(user.data.data))
    }catch(e){ alert('Authentication Error!') }
}