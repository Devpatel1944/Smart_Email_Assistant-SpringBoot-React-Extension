
import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
 const[emailContent,setEmailContent] = useState('');
 const[tone,setTone] = useState('');
 const[generateReplay,setGenerateReplay] = useState('');
 const[loading,setLoading] = useState(false);
 const[error,setError] = useState('');

 const handleSubmit =async ()=>{
   setLoading(true);
   setError('');
   try{
         const response = await axios.post("http://localhost:8080/api/email/generate",{
          emailContent,
          tone
         });
         setGenerateReplay(typeof response.data =='string'?response.data:JSON.stringify(response.data));
   }catch(error){
    setError('Failed to Generate email reply.Please try again');
    console.log(error);
   }finally{
    setLoading(false);
   }
 }


  return (
    <Container maxWidth="md" sx={{py:4}}>
       <Typography variant='h3' component="h1" gutterBottom>
        Smart Email Generator
       </Typography>

       <Box sx={{mx:3}}>
            <TextField 
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{mb:2}}/>

            <FormControl fullWidth sx={{mb:2}}>
              <InputLabel>Tone(Optional)</InputLabel>
             <Select
             value={tone || ''}
             label={"Tone(Optional)"}
             onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>

             </Select>
            </FormControl>

            <Button
            variant='contained'
            onClick={handleSubmit}
            disabled ={!emailContent || loading}
            fullWidth>
              {loading?<CircularProgress size={24}/> :"Generate Replay"}
            </Button>
       </Box>

       {error && (
        <Typography color='error' sx={{mb:2}}>
        {error}
       </Typography>
       )}

       {generateReplay &&(
         <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom>
               Generated Replay:
          </Typography>
          <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generateReplay ||''}
          inputProps={{readOnly:true}}/>

          <Button 
          variant='outlined'
          sx={{mt:2}}
          onClick={()=>navigator.clipboard.writeText(generateReplay)}>
            Copy to Clipboard
          </Button>
         </Box>
       )}
    </Container>
  )
}

export default App
