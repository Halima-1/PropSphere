import { CrossIcon, FolderClosed } from "lucide-react"

const CreateProperty = () => {
    return (
        <>
        <form action="">
            <div>
                <h2>List a new property</h2>
                <FolderClosed/>
            </div>

            <div>
                <label htmlFor="title">Property title</label>
                <input type="text" name="title" placeholder="title" value=""/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" name="price" placeholder="10 ETH" value=""/>
            </div><div>
                <label htmlFor="location">Location</label>
                <input type="text" name="tilocationtle" placeholder="Lagos.." value=""/>
            </div><div>
                <label htmlFor="category">Category</label>
                <select name="category" id="category">
                    <option value=""></option>
                </select>
                            </div>
        </form>
        </>
    )
}

export default CreateProperty   