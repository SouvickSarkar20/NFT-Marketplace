// import Navbar from "./Navbar";
// import { useState } from "react";
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
// import Marketplace from '../Marketplace.json';
// import { useLocation } from "react-router";

// export default function SellNFT() {
//     const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
//     const [fileURL, setFileURL] = useState(null);
//     const ethers = require("ethers");
//     const [message, updateMessage] = useState('');
//     const location = useLocation();

//     async function disableButton() {
//         const btn = document.getElementById("list-button");
//         btn.disabled = true;
//         btn.style.backgroundColor = 'grey';
//         btn.style.opacity = 0.3;
//     }

//     async function enableButton() {
//         const btn2 = document.getElementById("list-button");
//         btn2.enableButton = false;
//         btn2.style.backgroundColor = "#A500FF";
//         btn2.style.opacity = 1;
//     }


//     async function onChangeFile(e) {
//         let file = e.target.files[0];
//         try {
//             const response = await uploadFileToIPFS(file);
//             if (response.success == true) {
//                 console.log("uploaded image to pinata", response.pinataURL);
//                 setFileURL(response.pinataURL);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async function uploadMetaDataToIPFS() {
//        const {name , description , price} = formParams;

//        if(!name || !description || !price) {
//           updateMessage("Please fill all the field");
//           return -1;
//        }

//        const nftJSON = {
//         name,description,price,image : fileURL
//        }

//        try{
//         //upload the metadata to ipfs
//         const response = await uploadJSONToIPFS(nftJSON);
//         if(response.success){
//             console.log("Uploaded JSON to pinata");
//             return response.pinataURL;
//         }
//        }catch(error){
//         console.log("error");
//        }
//     }

//     async function listNFT(e) {
//         e.preventDefault();
//         console.log("inside listNFT");

//         try {
//             const metaDataURL = await uploadMetaDataToIPFS();
//             if (metaDataURL == -1) {
//                 return;
//             }
//             //get a provider to conneect to the etherium objet present in the browser,this helps us to interact with the blockchain
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//             disableButton();
//             updateMessage("Please wait NFT is getting uploaded");

//             //pull the deployed contract 
//             const contract = newethers.Contract(Marketplace.address, Marketplace.abi, signer);

//             const price = ethers.utils.parseUnits(formParams.price, 'ether');
//             let listingPrice = await contract.getListPrice();
//             listingPrice = listingPrice.toString();

//             //creating the nft now 
//             let transaction = await contract.createToken(metaDataURL, price, { value: listingPrice });
//             await transaction.wait();

//             alert("successfully listed ur nft");

//             enableButton();

//             updateMessage("");
//             updateFormParams({ name: '', description: '', price: '' });
//             window.location.replace("/");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="">
//             <Navbar></Navbar>
//             <div className="flex flex-col place-items-center mt-10" id="nftForm">
//                 <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
//                     <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
//                     <div className="mb-4">
//                         <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
//                         <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
//                     </div>
//                     <div>
//                         <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image (&lt;500 KB)</label>
//                         <input type={"file"} onChange={onChangeFile}></input>
//                     </div>
//                     <br></br>
//                     <div className="text-red-500 text-center">{message}</div>
//                     <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">
//                         List NFT
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";
import { ethers } from 'ethers'; // Import ethers from avalanche's version or regualar ethers.

export default function SellNFT() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState(null);
    const [message, updateMessage] = useState('');
    const location = useLocation();

    async function disableButton() {
        const btn = document.getElementById("list-button");
        btn.disabled = true;
        btn.style.backgroundColor = 'grey';
        btn.style.opacity = 0.3;
    }

    async function enableButton() {
        const btn2 = document.getElementById("list-button");
        btn2.disabled = false; // Corrected: Use 'disabled' instead of 'enableButton'
        btn2.style.backgroundColor = "#A500FF";
        btn2.style.opacity = 1;
    }

    async function onChangeFile(e) {
        let file = e.target.files[0];
        try {
            const response = await uploadFileToIPFS(file);
            if (response.success === true) {
                console.log("uploaded image to pinata", response.pinataURL);
                setFileURL(response.pinataURL);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function uploadMetaDataToIPFS() {
        const { name, description, price } = formParams;

        if (!name || !description || !price) {
            updateMessage("Please fill all the field");
            return -1;
        }

        const nftJSON = {
            name, description, price, image: fileURL
        };

        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success) {
                console.log("Uploaded JSON to pinata");
                return response.pinataURL;
            }
        } catch (error) {
            console.log("error");
        }
    }

    async function listNFT(e) {
        e.preventDefault();
        console.log("inside listNFT");

        try {
            const metaDataURL = await uploadMetaDataToIPFS();
            if (metaDataURL === -1) {
                return;
            }

            // Connect to Avalanche Fuji Testnet
            // Check if window.avalanche is available (Core Wallet)
            if (typeof window.avalanche === 'undefined') {
                updateMessage("Please install Core Wallet!");
                return;
            }

            // Connect to Avalanche using Core Wallet
            const provider = new ethers.providers.Web3Provider(window.avalanche);
            const signer = provider.getSigner();


            disableButton();
            updateMessage("Please wait NFT is getting uploaded");

            const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);

            const price = ethers.utils.parseUnits(formParams.price, 18); // 18 decimals for AVAX
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();

            let transaction = await contract.createToken(metaDataURL, price, { value: listingPrice });
            await transaction.wait();

            alert("successfully listed your nft");

            enableButton();

            updateMessage("");
            updateFormParams({ name: '', description: '', price: '' });
            window.location.replace("/");

        } catch (error) {
            console.error(error); // Use console.error for better error reporting
            updateMessage(`Error listing NFT: ${error.message}`); // Display error to user
            enableButton(); // Re-enable button on error
        }
    }

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-10" id="nftForm">
                <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
                    <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({ ...formParams, name: e.target.value })} value={formParams.name}></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in AVAX)</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 AVAX" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                    </div>
                    <div>
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image (&lt;500 KB)</label>
                        <input type={"file"} onChange={onChangeFile}></input>
                    </div>
                    <br></br>
                    <div className="text-red-500 text-center">{message}</div>
                    <button onClick={listNFT} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">
                        List NFT
                    </button>
                </form>
            </div>
        </div>
    );
}