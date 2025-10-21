import React, { useEffect, useState } from 'react'
import './Placar.css'

export default function Placar({ganhador}) {

    const [usuarioX,setUsuarioX] = useState(0);
    const [usuarioO,setUsuarioO] = useState(0);

    useEffect(()=>{
        if(ganhador === 'O'){
            setUsuarioO(prev => prev+1);
          }else if(ganhador === 'X'){
            setUsuarioX(prev => prev+1); 
          }
        }, [ganhador]);



  return (

        <div className='placar'>
          <div>Jogador X:  {usuarioX}</div>
          <div>Jogador O:  {usuarioO}</div>
        </div>
  )
}
