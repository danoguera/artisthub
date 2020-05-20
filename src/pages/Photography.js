import React from 'react';

class Posts extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    render(){
        let posts = [{"title":"Fotografia de bodas", "description": "Tomamos lasmejores fotografias de su boda.", "post_image":"http://cdn3.upsocl.com/wp-content/uploads/2016/09/38A4705E00000578-0-image-m-55_1474455679307-2.jpg"},
        {"title":"Fotografia aerea", "description":"Hacemos tomas aereas con drone", "post_image":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Quadcopter_camera_drone_in_flight.jpg/800px-Quadcopter_camera_drone_in_flight.jpg"},
                    {"title":"Fotografia modelos", "description": "Fotos de modelaje", "post_image":"http://www.buro247.mx/images/2-modelos-3a-edad.jpg"} ,
                    {"title":"Fotografia de alimentos","description":"Tomamos las mejores fotos para tus catalogos", "post_image":"https://tierraquerida.com.co/wp-content/uploads/2019/08/bandeja-paisa-1080x694.jpg"}
                  ];

        return (
            
            <table>
              <tbody>
           {posts.map(post => 
            <tr>
              <td><img width="200" src={post.post_image} alt=""/></td>
              <td> <h2>{post.title} </h2></td>
              <td> <strong>{post.description} </strong></td>
            </tr>
            )} 
            </tbody>
          </table>

        )

    }
} 


export default Posts;