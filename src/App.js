import { useState, useEffect } from 'react';
import { Radio, Tooltip } from 'antd';
import Button from './components/button'
import 'antd/dist/antd.css'
import {Collapse} from './components/collapse'
import {CopyOutlined, LinkedinOutlined} from '@ant-design/icons'
import './App.scss';

const initialDivs = [
  {id:1, height: 200, width:200, color:'purple'},
  {id:2, height: 200, width:200, color:'red'},

]
function App() {

 const [divs, setDivs] = useState(initialDivs);
  const [isFlex, setIsFlex] = useState(true)
  const [justifyContent, setJustifyContent] = useState(undefined)
  const [direction, setDirection] = useState(undefined)
  const [alignItems, setAlignItems] = useState(undefined);
  const [flexWrap, setFlexWrap] = useState(undefined);
  const [cssAttributes, setCssAttributes] = useState([]);
  const [gap, setGap] = useState(0);

  const addDiv = () =>{
    setDivs(prevDivs=> [...prevDivs, {
      id: Date.now(),
      height: '200',
      width :'200',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }])
  }

  const handleJustifyChange = e =>{
    if(e.target.checked) {
      setJustifyContent('flex-start')
      setCssAttributes(prev => [...prev, ['justify-content', 'flex-start']])
    } else{
      setJustifyContent(undefined)
      deleteAttribute('justify-content')  
    } 
  }
  const handleDirection = e =>{
    if(e.target.checked) {
      setDirection('row')
      setCssAttributes(prev => [...prev, ['flex-direction', 'row']])
    } else{
      setDirection(undefined)
      deleteAttribute('flex-direction')  
    } 
  }
  const handleAlign = e =>{
    if(e.target.checked) {
      setAlignItems('flex-start')
      setCssAttributes(prev => [...prev, ['align-items', 'flex-start']])
    } else{
      setAlignItems(undefined)
      deleteAttribute('align-items',)
    } 
  }
  const handleWrap = e =>{
    if(e.target.checked) {
      setFlexWrap('nowrap')
      setCssAttributes(prev => [...prev, ['flex-wrap', 'nowrap']])
    }else {
      setFlexWrap(undefined)
      setCssAttributes(cssAttributes.filter(item =>{
        return item[0]!=='flex-wrap'
      })) 
    } 
  }

  const handleDelete = id => {
    setDivs(divs.filter(div=> div.id !== id))
  }

  const resetAll = () =>{
    setDivs(initialDivs)
    setJustifyContent(undefined)
    setDirection(undefined)
    setAlignItems(undefined)
    setFlexWrap(undefined)
    setGap(0)
    setCssAttributes([])
    setIsFlex(true)
  }

  const updateAttribute = (attribute,value) =>{
    setCssAttributes(cssAttributes.map(item =>{
      if(item[0]=== attribute){
        return [item[0], value]
      }
      return item
    }))
  }

  const deleteAttribute =  attribute =>{
    setCssAttributes(cssAttributes.filter(item =>{
      return item[0]!== attribute
    })) 
  }

  const generatedCode = () =>{
    return  (`    .container{
      display:flex;
      ${cssAttributes.map(item => `${item[0]}: ${item[1]};\n      `).join('')}}`)
  }

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
       setTimeout(() => {
          isCopied && setIsCopied(false) 
      }, 2000);
  }, [isCopied])

  return (
    <div className="app">
      <div className="app__left">
<div className="app__left__top">
<h1>Flex

<span style={{color:'purple',fontSize:'2rem'}}>Playground</span>
</h1>
<div className="app__left__actions">
<Button onClick={addDiv}>+ Add div</Button>
  <Button
  onClick={resetAll}
  >
    Reset
  </Button>
</div>
<>
<p>Gap
<span><input
className='app__left__gapInput'
value={gap} min='0' type='number' onChange={({target:{value}})=>{
setGap(value)
if(!cssAttributes.some(item => item[0]==='gap')){
  setCssAttributes(prev => [...prev, ['gap', value + 'rem']])
}else{
  if(value ==='0' || !value) {
    deleteAttribute('gap')
  }else{
    updateAttribute('gap', value + 'rem')
  }
  
}

}} /></span>
</p>

<h2>Play with the attributes</h2>
<Collapse 
checkValue={!!justifyContent}
onChange={handleJustifyChange} title='Justify content'>
<Radio.Group
className='radio'
onChange={e=> {
  setJustifyContent(e.target.value)
  updateAttribute('justify-content', e.target.value)
}}
value={justifyContent} buttonStyle="solid" style={{ marginTop: 16 }}>
<Radio.Button value="flex-start" >Flex start</Radio.Button>
<Radio.Button value="space-between">Space between</Radio.Button>
<Radio.Button value="space-around">Space around</Radio.Button>
<Radio.Button value="space-evenly">Space evenly</Radio.Button>
<Radio.Button value="center" >Center</Radio.Button>
<Radio.Button value="flex-end">Flex end</Radio.Button>
</Radio.Group>
</Collapse>
<Collapse
checkValue={!!alignItems}
onChange={handleAlign} title='Align items'>
<Radio.Group
className='radio'
onChange={e =>{
 setAlignItems(e.target.value)
 updateAttribute('align-items', e.target.value)
}}
value={alignItems} buttonStyle="solid" style={{ marginTop: 16 }}>
<Radio.Button value="flex-start">Flex start</Radio.Button>
<Radio.Button value="center">Center</Radio.Button>
<Radio.Button value="flex-end">Flex end</Radio.Button>
</Radio.Group>
</Collapse>
<Collapse
checkValue={!!direction}
onChange={handleDirection} title='Flex Direction'>
<Radio.Group
className='radio'
onChange={e=> {
  setDirection(e.target.value)
  updateAttribute('flex-direction', e.target.value)
}}
value={direction} buttonStyle="solid" style={{ marginTop: 16 }}>
<Radio.Button value="row">Row</Radio.Button>
<Radio.Button value="column">Column</Radio.Button>
<Radio.Button value="row-reverse">Row reverse</Radio.Button>
<Radio.Button value="column-reverse" >Column reverse</Radio.Button>
</Radio.Group>
</Collapse>

<Collapse
checkValue={!!flexWrap}
onChange={handleWrap} title='Flex Wrap'>
<Radio.Group
className='radio'
onChange={e =>{
 setFlexWrap(e.target.value)
 updateAttribute('flex-wrap', e.target.value)
}}
value={flexWrap} buttonStyle="solid" style={{ marginTop: 16 }}>
<Radio.Button value="nowrap">Nowrap</Radio.Button>
<Radio.Button value="wrap">Wrap</Radio.Button>
<Radio.Button value="wrap-reverse">Wrap reverse</Radio.Button>
</Radio.Group>
</Collapse>

</>
</div>
<div className="app__left__bottom">
  Created by Pablo Vélez
  <a
  className="app__left__bottom__icon"
  href='https://www.linkedin.com/in/pablo-v%C3%A9lez-a56741a1/'
  target='_blank'
  rel="noreferrer"
  >
    Linkedin 
  <LinkedinOutlined
  style={{color:'#242d50', marginLeft:'5px'}}
  />
  </a>
</div>
      </div>
      <div className="app__right">
        <div className="app__code">
         {isFlex && <pre>
            <code>
              {generatedCode()}
            </code>
          </pre>}
          <div 
          onClick={()=>{
            navigator.clipboard.writeText(generatedCode())
            setIsCopied(true)
          }}
          className="app__code__copy">
                                <Tooltip
                    mouseLeaveDelay={isCopied ? 2 : 0.3}
                    title={isCopied ? 'copied!' :'copy'} trigger='hover'>
                    <CopyOutlined style={{color:'#fff', fontSize:'18px'}} />
                    </Tooltip>

          </div>
        </div>
          <div
          style={{
            display: isFlex ? 'flex':'unset',
            justifyContent: justifyContent || 'unset',
            flexDirection: direction || 'unset',
            alignItems:alignItems || 'unset',
            flexWrap:flexWrap || 'unset',
            gap: `${gap}rem` || 'unset',
          }}
          className="app__flexbox">
            <div className="app__flexbox__blur" />
            {
              divs.map(({id, height,width,color})=> (
                <div 
                key={id}
                className="app__flexbox__div"
                style={{
                    position: 'relative',
                    backgroundColor: color
                   }} 
                >
               <div
               onClick={()=> handleDelete(id)}
               className='app__flex__div__delete'
               style={{
                 fontWeight:'bold',
                 position:'absolute',
                 cursor: 'pointer',
                 top:'0.4rem',right:'0.6rem'}}>
                  X
                </div>
                </div>

              ))
            }
          </div>
      </div>
    </div>
  );
}

export default App;
