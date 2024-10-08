import upload_area from "../assets/upload_area.svg"
import { MdAdd } from "react-icons/md";
import { useState } from "react";

export const AddProduct = () => {
    const [image, setImage]= useState(false);
    const [productDetails, setProductDetails]=useState({
        name:"",
        image:"",
        category:"Men",
        new_price:"",
        old_price:""
    });
    const changeHandler = (e)=> {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const imageHandler = (e) =>{
       setImage(e.target.files[0])
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product=productDetails;
        let formData = new FormData();
        formData.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method: 'POST',
            headers:{
                Accept:'application/json',
            } ,
            body:formData,

        }).then((resp)=> resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            
            await fetch("http://localhost:4000/addproduct", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added"):alert("Upload Failed")
            })
        }
        
    }
  return (
    <div className="p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7">
        <div className="mb-3">
            <h4 className="bold-18 pb-2">Nom du produit</h4>
            <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="taper ici.." className="bg-primary outline-none max-w-88 w-full py-3 px-4 rounded-md" />
        </div>
        <div className="mb-3">
            <h4 className="bold-18 pb-2">  Prix :</h4>
            <input type="text" name="old_price"  value={productDetails.old_price} onChange={changeHandler} placeholder="taper ici.." className="bg-primary outline-none max-w-88 w-full py-3 px-4 rounded-md" />
        </div>
        <div className="mb-3">
            <h4 className="bold-18 pb-2">Prix promo</h4>
            <input type="text" name="new_price" value={productDetails.new_price}  onChange={changeHandler} placeholder="taper ici.." className="bg-primary outline-none max-w-88 w-full py-3 px-4 rounded-md" />
        </div>
        <div className="mb-3 flex items-center gap-x-4">
            <h4 className="bold-18 pb-2 ">Categorie du produit</h4>
            <select name="category" id="" value={productDetails.category} onChange={changeHandler} className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none">
                <option value="Men">Homme</option>
                <option value="Women">Femme</option>
                <option value="Kid">Enfant</option>
            </select>
        </div>
        <div>
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className="w-20 rounded-sm  inline-block" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden className="bg-primary max-w-80 w-full  py-3 px-4" />
        </div>
        <button onClick={() => Add_Product()} className="btn_dark_rounded mt-4 flexCenter gap-x-1"><MdAdd/>Ajouter produit</button>
    </div>
  
  )
}
