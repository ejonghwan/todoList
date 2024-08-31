import { Fragment, useRef, useState } from 'react';
import Button from '@/components/common/button/Button';
import '@/assets/css/common/Pagenation.css';

const Pagenations = ({ allLength, pageNum, setPageNum }) => {

    const [pageGroupMinLen, setPageGroupMinLen] = useState(0); //0부터 +-
    const [pageGroupMaxLen, setPageGroupMaxLen] = useState(1);  //1부터 +-
    const pageGroupNumberRef = useRef(9); // 보여지는 아이템 갯수 .
    const test = useRef(5); // 보여지는 페이징 숫자.

    const handlePrevPageGroup = () => {
        setPageGroupMinLen(prev => prev - 1);
        setPageGroupMaxLen(prev => prev - 1);
        setPageNum( pageGroupMinLen * pageGroupNumberRef.current - (pageGroupNumberRef.current - 1));
    };
    
    const handleNextPageGroup = () => {
        setPageGroupMinLen(prev => prev + 1);
        setPageGroupMaxLen(prev => prev + 1);
        setPageNum(pageGroupMaxLen * pageGroupNumberRef.current + 1);
    };

    return (
        <>
        <div className='page_number_wrap'> 
            <div>item ? : {((pageGroupNumberRef.current * pageNum + 1) - pageGroupNumberRef.current)}~{(pageGroupNumberRef.current + 1) * pageNum}</div>
            <div className='prev_btn_wrap' style={{ border: '1px solid red' }}>
                <Button 
                    onClick={handlePrevPageGroup}
                    disabled={pageGroupMinLen === 0 && true}
                    className={'button_reset button_type4 button_type_arrow_l hover_type1'}
                >
                    <span className='blind'>이전 {test.current} 페이지</span>
                </Button>
            </div>

            {Array(Math.ceil(allLength / pageGroupNumberRef.current)).fill(null).map((_, idx) => {
                return (
                    <Fragment key={idx}>
                        {idx >= (pageGroupMinLen * test.current) &&  idx < (pageGroupMaxLen * test.current) && (
                            <Button 
                                className={`button_reset page_number_item hover_type1 ${pageNum === idx + 1 ? 'active' : ''}`}
                                onClick={() => setPageNum(idx + 1)}
                            >{idx + 1}</Button>
                        )}
                    </Fragment>
                );
            })}

            <div className='next_btn_wrap' style={{ border: '1px solid red' }}>
                <Button 
                    onClick={handleNextPageGroup} 
                    disabled={allLength / pageGroupNumberRef.current <= pageGroupMaxLen * test.current && true} 
                    // 검색갯수 / 보여줄페이징 <= 페이징맥스넘버 * 보여줄페이징
                    className={'button_reset button_type4 button_type_arrow_r hover_type1'}
                >
                    <span className='blind'>다음 {pageGroupNumberRef.current} 페이지</span>
                </Button>
            </div>
        </div>



<div className='prev_btn_wrap' style={{ border: '1px solid red' }}>
    <Button 
        onClick={handlePrevPageGroup}
        disabled={pageGroupMinLen === 0 && true}
        className={'button_reset button_type4 button_type_arrow_l hover_type1'}
    >
        <span className='blind'>이전 {pageGroupNumberRef.current} 페이지</span>
    </Button>
</div>


{Array( Math.ceil(allLength / pageGroupNumberRef.current) ).fill(null).map((_, idx) => {
    return (
        <Fragment key={idx}>
            {idx >= (pageGroupMinLen * pageGroupNumberRef.current) && idx < (pageGroupMaxLen * pageGroupNumberRef.current) && (
                <Button 
                    className={`button_reset page_number_item hover_type1 ${pageNum === idx + 1 ? 'active' : ''}`}
                    onClick={() => setPageNum(idx + 1)}
                >{idx + 1}</Button>
            )}
        </Fragment>
    );
})}

<div className='next_btn_wrap' style={{ border: '1px solid red' }}>
    <Button 
        onClick={handleNextPageGroup} 
        disabled={allLength / pageGroupNumberRef.current <= pageGroupMaxLen * pageGroupNumberRef.current && true} 
        // 검색갯수 / 보여줄페이징 <= 페이징맥스넘버 * 보여줄페이징
        className={'button_reset button_type4 button_type_arrow_r hover_type1'}
    >
        <span className='blind'>다음 {pageGroupNumberRef.current} 페이지</span>
    </Button>
</div>



        </>
    );
};

export default Pagenations;



//1.  1~9
//2.  10~18
//3.  19~27
//4.  28~36
//5.  37~45
//6.  46~54 
//7.  55~63
//8.  64~72
//9.  73~81
//10.  82~90
//11.  91 