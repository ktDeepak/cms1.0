
const regTemplate=(name,email)=>{
    return `<div>
       <h1 style=color:slateblue"> Hi,${name} Welcome to CMS-v1.0</h1>
       <article style="margin":auto;object-fit:"cover"> 
       <img src:"https://www.nicepng.com/png/full/27-270576_business-clipart-handshake-handshake-clipart.png" width="300" height="300"/>
       <h4> we are excited to have you get started with mail id 
       =<span style="color:orangered">${email}</span>,You account is ready to use</h4>
       </article>
    </div>`
}
module.exports=regTemplate