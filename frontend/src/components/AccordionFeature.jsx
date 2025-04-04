import React from 'react'
import Accordion from '@mui/material/Accordion';
import { FaArrowAltCircleDown, FaArrowDown, FaArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import accordionData from '../ApiData/AccordionData';


const AccordionFeature = () => {
  return (
    <div>

        {accordionData.map((data)=>{
            return <>

                <Accordion key={data.id}>
                    <AccordionSummary
                    expandIcon={<FaArrowDown/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <h3>{data.query}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                    <p className='answer'>
                        {data.answer}
                    </p>
                    </AccordionDetails>
                </Accordion>
            </>
        })}
      
    
    </div>
  )
}

export default AccordionFeature