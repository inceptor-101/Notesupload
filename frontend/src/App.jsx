import { useState } from 'react'
import './App.css'
import Documents from './components/Documents';

function App() {
  const [data, setData] = useState({
    query_text: "",
    n_results: 0,
  });

  const [resultingString, setString] = useState(null);

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent default form submission
    const { query_text, n_results } = data;
    const response = await fetch('http://127.0.0.1:5000/query', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query_text: query_text,
          n_results: n_results,
      }),
    })
    
    const result = await response.json();
    console.log("i am result-------------->");
    console.log(result)
    setString(result);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='flex h-full items-center justify-center flex-col gap-14'>
      <h2 className='text-sky-500 font-bold text-2xl'>SENTENCE MATCHER</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5 border-2 p-4 border-slate-500 rounded-xl'>
        <div className='flex gap-4'>
          <label htmlFor="query_text">Input the query string</label>
          <input
            type="text"
            id="query_text"
            name="query_text"
            value={data.query_text}
            onChange={handleInputChange}
            className='border-2 border-slate-400 rounded-xl'
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor="n_results">Input the number of results</label>
          <input
            type="number"
            id="n_results"
            name="n_results"
            value={data.n_results}
            onChange={handleInputChange}
            className='border-2 border-slate-400 rounded-xl flex justify-center'
          />
        </div>
        <button type="submit" className='flex grow w-full hover:bg-sky-500 justify-center hover:text-white p-1 rounded-full text-sky-500 border-slate-500'>Submit</button>
      </form>
      {resultingString && 
      <div className='flex flex-col items-center gap-2 border-2 p-4 border-slate-500 rounded-xl'>
        <Documents data={resultingString}/>
      </div>
      }
    </div>
  )
}

export default App
