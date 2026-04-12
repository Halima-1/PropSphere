import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { uploadToPinata } from "../utils/pinata"
import { useCreateProperty } from "../hooks/useCreateProperty"
import { useNavigate } from "react-router-dom"

// type CreatePropertyProps = {
//   onClose: () => void
//   style?: React.CSSProperties   // inline styles

// }

const CreateProperty = () => {
    const createProperty = useCreateProperty();
    const { register, handleSubmit, setValue } = useForm()
    const [imageCids, setImageCids] = useState<string[]>(["", "", "", ""])
    const [imageNames, setImageNames] = useState<string[]>(["", "", "", ""])
    const [uploading, setUploading] = useState<boolean[]>([false, false, false, false])
const navigate = useNavigate()

    const resetForm =()=>{
        setImageCids(["", "", "", ""])
        setImageNames(["", "", "", ""])
        setUploading([false, false, false, false])
    }


    
    const handleImageUpload = async (index: number, file: File) => {
        if (!file) return
        const newUploading = [...uploading]
        newUploading[index] = true
        setUploading(newUploading)
        
        const loadingId = toast.loading(`Uploading "${file.name}" to Pinata...`)
        
        try {
            const cid = await uploadToPinata(file)
            if (cid) {
                const newCids = [...imageCids]
                newCids[index] = cid
                setImageCids(newCids)

                const newNames = [...imageNames]
                newNames[index] = file.name
                setImageNames(newNames)

                setValue(`imageUri${index}`, cid)
                toast.success(`Image "${file.name}" uploaded successfully`, { id: loadingId })
            }
        } catch (error) {
            toast.error(`Failed to upload ${file.name}`, { id: loadingId })
            console.error(error)
        } finally {
            const newUploading = [...uploading]
            newUploading[index] = false
            setUploading(newUploading)
        }
    }

    const onsubmit = async (data: any) => {
        const {
            price,
            type,
            category,
            warranty,
            status,
            location,
            title,
            description,
        } = data;

        const filteredCids = imageCids.filter(cid => cid !== "");
        if (filteredCids.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        const concatenatedImages = filteredCids.join(",");

        try {
            if (!createProperty) {
                toast.error("Hook not initiated")
                return
            }
            
            // Expected order based on hook/ABI:
            // _amount, _category, _propType, _status, _warranty, _imgUri, _location, _title, _description
            await createProperty(
                BigInt(Math.floor(Number(price))),
                Number(category),
                Number(type),
                Number(status),
                Number(warranty),
                concatenatedImages,
                location || "",
                title || "",
                description || ""
            )
            resetForm()
        } catch (error) {
            console.error(error)
        }
        
    };

    return (
            <form onSubmit={handleSubmit(onsubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="intro">
                <h2>List a new property</h2>
                {/* <b onClick={onClose}>X</b> */}
                </div>

                    <div>
                        <label htmlFor="title">Property title</label>
                        <input type="text" {...register("title", { required: true })} placeholder="E.g. Modern Villa" style={{ width: '90%' }} />
                    </div>
                    <div>
                        <label htmlFor="price">Price (Whole Numbers of tokens)</label>
                        <input type="number" {...register("price", { required: true })} placeholder="1" style={{ width: '100%' }} />
                    </div>

                <div className="images-upload-section">
                    <label style={{ fontWeight: 'bold' }}>Images (Up to 4)</label>
                    <div className="images-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="image-input-box" style={{ border: '1px dashed #ccc', padding: '15px', textAlign: 'center', borderRadius: '8px', background: uploading[index] ? '#f9fafb' : 'transparent', transition: 'background 0.3s' }}>
                                <label className="file-label" style={{ cursor: uploading[index] ? 'not-allowed' : 'pointer', display: 'block' }}>
                                    {uploading[index] ? (
                                        <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>Uploading...</div>
                                    ) : imageCids[index] ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <span style={{ color: '#22c55e', fontSize: '0.9rem' }}>✓ {imageNames[index]}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#3b82f6', textDecoration: 'underline' }}>Change file</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6366f1' }}>
                                            <span style={{ fontSize: '1.2rem' }}>+</span>
                                            <span>Image Slot {index + 1}</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        disabled={uploading[index]}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleImageUpload(index, file)
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {imageCids[index] && !uploading[index] && (
                                    <div className="cid-preview" style={{ fontSize: '0.65rem', marginTop: '5px', color: '#999' }}>
                                        CID: {imageCids[index].slice(0, 15)}...
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                    <div>
                        <label htmlFor="location">Location</label>
                        <input type="text" {...register("location", { required: true })} placeholder="Lagos, Nigeria" style={{ width: '100%' }} />
                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>

                    <div>
                        <label htmlFor="status">Status</label>
                        <select {...register("status")} id="status" style={{ width: '100%' }}>
                            <option value="0">New</option>
                            <option value="1">Fairly used</option>
                            <option value="2">Old</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="type">Property type</label>
                        <select {...register("type")} id="type" style={{ width: '100%' }}>
                            <option value="0">Vehicle</option>
                            <option value="1">Land</option>
                            <option value="2">House</option>
                            <option value="3">Jewelry</option>
                            <option value="4">Clothe</option>
                            <option value="5">Electrical Device</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select {...register("category")} id="category" style={{ width: '100%' }}>
                            <option value="0">Luxury</option>
                            <option value="1">Middle Range</option>
                            <option value="2">Affordable</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="warranty">Warranty</label>
                        <select {...register("warranty")} id="warranty" style={{ width: '100%' }}>
                            <option value="0">Yes</option>
                            <option value="1">No</option>
                        </select>
                    </div>
                </div>

                 <div>
                    <label htmlFor="description">Property description</label>
                    <textarea {...register("description")} id="description" placeholder="Describe the property here.." style={{ width: '100%', minHeight: '80px' }}></textarea>
                </div>
                
                <div className="ppty-btn">
                    <button type="button" 
          onClick={() => 
            navigate(`/Dashboard/overview`)
          }
                              >Cancel</button>
                    <button type="submit">Create Property</button>
                </div>
            </form>
    )
}

export default CreateProperty