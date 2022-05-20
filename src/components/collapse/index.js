import { Checkbox } from 'antd'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

export const Collapse = ({title, children, onChange, checkValue}) => {
    const [openCollapse, setOpenCollapse] = useState(false)
    const ref = useRef(null);
    const [height, setHeight] = useState(
        openCollapse ? undefined : 0
      );
      
    useEffect(() => {
    if (openCollapse) setHeight('100%');
    else setHeight(0);
    }, [openCollapse]);


useEffect(() => {
  !checkValue && setOpenCollapse(false)
}, [checkValue]);
    return (
        <div  className={styles.collapse}>
            <div  
            className={styles.collapseTitle}>
                
                <div className={styles.collapseTitleText}>
                <span><div style={{height:'10px',width:'10px', backgroundColor:'black', borderRadius:'50%', marginRight:'6px'}} /></span>
                  {title}</div>
                <div className={styles.collapseCheckbox}>
                  <span onClick={()=> setOpenCollapse(!openCollapse)}>
                <Checkbox
                checked={checkValue}
                onChange={onChange}></Checkbox>
                  </span>
                  <span className={styles.activeText}>{checkValue ? "I'm active!": 'active me!'}</span>
                </div>
            </div>
          <div
          style={{height}}
          className={styles.collapseSubs}
          >
              <div  ref={ref}>
                {children}
              </div>
            </div>
        </div>
    )
}