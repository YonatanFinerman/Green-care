
export const uploadImg = async (file) => {
    if (file) {
        const CLOUD_NAME = 'dikej5hlx'
        const UPLOAD_PRESET = 'iyqztqra'
        // const UPLOAD_URL = `http:/api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`

        const FORM_DATA = new FormData()

        //Building the request body
        FORM_DATA.append('file', file)
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)
        //sending a post method request to cloudinary Api
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA
            })
            console.log(res)
            const { url } = await res.json()
            console.log(url,'uploaded')
            return url

            // const elImg = document.createElement('img')
            // elImg.src = url
            // document.body.append(elImg)
        } catch (err) {
            console.error(err)
        }
    }
}
// export const uploadImg = async (input) => {
//     if (input.files && input.files[0]) {
//         const CLOUD_NAME = 'dikej5hlx'
//         const UPLOAD_PRESET = 'iyqztqra'
//         const UPLOAD_URL = `http:/api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`
//         const FORM_DATA = new FormData()

//         //Building the request body
//         FORM_DATA.append('file', input.files[0])
//         FORM_DATA.append('upload_preset', UPLOAD_PRESET)
//         //sending a post method request to cloudinary Api
//         try {
//             const res = await fetch(UPLOAD_URL, {
//                 method: 'POST',
//                 body: FORM_DATA
//             })
//             const { url } = await res.json()
//             console.log(url,'uploaded')
//             // const elImg = document.createElement('img')
//             // elImg.src = url
//             // document.body.append(elImg)
//         } catch (err) {
//             console.error(err)
//         }
//     }
// }