import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;


function Form() {

  const [data,setData] = useState({
    sourceCode:"",
    username:"",
    stdInput:"",
    language:""
  });

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleChange = (e) =>{
    setData ({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...")
    setLoading(true);
    try{
      const response = await axios.post(`${BASE_URL}/submit`,data,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setData({
        sourceCode: "",
        username: "",
        stdInput: "",
        language: ""
      });
      toast.success("Submitted");
      console.log('Data submitted successfully',response);
      navigate("/view")
    } catch(err){
      console.error('Error:', err.message);
      toast.error("Could Not Submit Details")
    }
    toast.dismiss(toastId)
    setLoading(false);
  }


  return (
    <div className="container">

    <h1>TakeUforward</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input id="name" type="text" name="username" value={data.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="std">Standard Input:</label>
          <input id="std" type="text" name="stdInput" value={data.stdInput} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="code">Source Code:</label>
          <textarea name="sourceCode" value={data.sourceCode} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="language">Choose Language:</label>
          <select name="language" value={data.language} id="language" onChange={handleChange}>
            <option value="" disabled>Select Language</option> {/* Placeholder option */}
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="JAVA">Java</option>
            <option value="C_PLUS_PLUS">C++</option>
            <option value="PYTHON">Python</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading} > {loading ? 'Submitting...' : 'Submit'}</button>
        </div>
      </form>
    </div>
  );
}

export default Form;