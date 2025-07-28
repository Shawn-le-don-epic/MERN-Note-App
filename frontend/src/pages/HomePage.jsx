import React, { use, useState, useEffect }  from 'react'
import NavBar from '../components/NavBar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import axios from 'axios';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        //const data = await res.json(); //not needed while using axios
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes");
        console.log(error);
        if(error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
          setLoading(false);
      }
    };
      fetchNotes();
  }, []);
  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className='mx-auto max-w-6xl p-4'>
        {loading && <div className='text-center text-primary font-bold text-2xl mb-4 py-10'>Loading...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              //<div>
              //  {note.title} | {note.content}
              //</div>
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;