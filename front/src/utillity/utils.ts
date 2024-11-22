

export const questionData = [
   { questionType: 0, question: '질문을 선택해주세요' },
   { questionType: 1, question: '가장 기억에 남는 장소는?' },
   { questionType: 2, question: '좋아하는 색은?' },
   { questionType: 3, question: '다른 이메일 주소는?' },
   { questionType: 4, question: '보물 1호는?' },
   { questionType: 5, question: '좋아하는 음식은?' },
]


/** 
* 딜레이 함수
* @param {number} endSecond - 몇초 지연 후 실행할건지
* @param {function} cb - 콜백함수()
* @returns {undefined} 
*/
export const delay = (endSecond: number, cb: () => void) => {
   if(!endSecond || !cb) return console.error('인수 모두 채워주세요');
   if(typeof endSecond !== 'number' || typeof cb !== 'function' ) {console.error('인수 타입체크해주세요')}
   setTimeout(() => {
       cb()
   }, endSecond * 1000)

}



/** 
* 타이머 함수
* @param {number} endSecond - 끝나는 시간
* @param {number} startingPoint - 카운팅 시작하는 시간
* @param {function} cb - 콜백함수(카운트)
* @param {undefined} initialVariable - 인터벌 저장할 변수
* @returns {undefined} 
*/
export const timer = (endSecond: number, startingPoint: number, cb: (n: number) => void, initialVariable: any) => {
   if(!endSecond || !startingPoint || !cb ) return console.error('인수 모두 채워주세요');
   if(typeof endSecond !== 'number' || typeof startingPoint !== 'number' || typeof cb !== 'function' ) return console.error('인수 타입체크해주세요')

   const countPoint = endSecond - startingPoint //startingPoint = 몇초가 지났을때

   setTimeout(() => {
       let down = startingPoint;
       initialVariable = setInterval(() => {
           down -= 1
           cb(down)
           if(typeof down !== 'number') return console.error('타이머 타입체크')
           if(down <= 0) { clearInterval(initialVariable); }
       }, 1000)
   }, countPoint * 1000)
}



/** 
* 초 단위로 계산해서 day hour minute second 으로 리턴
* @param {number} totalNumber - 총 시간(초)
* @param {string} viewTime - case: day, hour, minute, second
* @returns {string} 일 시간 분 초 
*/
export const changeDate = (totalNumber: number, viewTime: string) => {
   if(typeof totalNumber !== 'number') return console.error('넘버로 넣어줭')
   let day = Math.floor(Math.floor(Math.floor(totalNumber / 60) / 60) / 24);
   let hour = Math.floor(Math.floor(totalNumber / 60) / 60) % 24;
   let minute = Math.floor(totalNumber / 60) % 60;
   let second = totalNumber % 60;

   switch(viewTime) {
       case 'day': return `${day}일 ${hour}시간 ${minute}분 ${second}초`;
       case 'hour': return `${hour}시간 ${minute}분 ${second}초`;
       case 'minute': return `${minute}분 ${second}초`;
       case 'second': return `${second}초`;
       default: return `${day}일 ${hour}시간 ${minute}분 ${second}초`;
   }
}

/** 
* 게시물에 들어가는 날짜 변환
* @param {number} date - 변환하고 싶은 날짜
* @param {string} viewTime - case: year, month, day, hour, minute, second ~까지
* @returns {string} date object
*/
export const changeViewDate = (date: number, viewTime: string) => {
   const year = new Date(date).getFullYear();
   const month = new Date(date).getMonth() + 1;
   const day = new Date(date).getDate();
   const hour = new Date(date).getHours();
   const minute = new Date(date).getMinutes();
   const second = new Date(date).getSeconds();

   switch(viewTime) {
       case 'year': return `${year}.`;
       case 'month': return `${year}. ${month}.`
       case 'day': return `${year}. ${month}. ${day}.`;
       case 'hour': return `${year}. ${month}. ${day}. ${hour}`;
       case 'minute': return `${year}. ${month}. ${day}. ${hour}:${minute}`;
       case 'second': return `${year}. ${month}. ${day}. ${hour}:${minute}:${second}`;
       default: return `${year}. ${month}. ${day}.`;
   }
}



/** 
* 현재 시간 반환
* @returns {string} 년 월 일 시간 분 초 
*/
export const initTime = () => {
   const sampleTimestamp = Date.now();
    // const millis = Math.floor((Date.now() - start) / 1000); //경과시간
    const date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성

   const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
   const month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
   const day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
   const hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
   const minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
   const second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

   const returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;
   return returnDate;
}


/** 
* 현재 시간 반환 (이전)
* @returns {string} 년 월 일 시간 분 초 
*/
export const timeForToday = (date: string) => {
   const today = new Date();
   const timeValue = new Date(date);

   const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
   if (betweenTime < 1) return '방금전';
   if (betweenTime < 60) {
       return `${betweenTime}분전`;
   }

   const betweenTimeHour = Math.floor(betweenTime / 60);
   if (betweenTimeHour < 24) {
       return `${betweenTimeHour}시간전`;
   }

   const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
   if (betweenTimeDay < 365) {
       return `${betweenTimeDay}일전`;
   }

   return `${Math.floor(betweenTimeDay / 365)}년전`;
}



/**
* 상태 코드 첫 숫자 확인하는 함수
* @param {Number} statusCode - 성공한 상태코드
* @param {Number, [Number]} matched - 비교할 넘버. 상태코드 첫숫자
* @returns {Boolean} - 비교 후 불리언 값 반환
*/
export const statusCode = (statusCode: number, matched: number[] | string[]) => {
   const code = (statusCode).toString();
   if(matched instanceof Array) {
       for(let i = 0; i < matched.length; i++) {
           if(code[0] === matched[i]) return true;
       }
   }
   if(typeof matched === 'number') { return Number(code[0]) === matched ? true : false; }
   return false;
}


/**
* 비번 체크 (8~ 16글자 + 1개 이상의 숫자 + 1개 이상의 특수문자 + 온니 영문) 
* @param {String} password - 비번
* @returns {Boolean} - 정규식 체크 후 불리언값 리턴
*/
export const passwordChecked = (password: string) => {
  if(typeof password !== 'string') return console.error('문자열 아님')
  const regexp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/g;
  return password.match(regexp) ? true : false;
}


/**
* 영문 체크 (온니 영문만) 
* @param {String} str - 체크할 문자열
* @returns {Boolean} - 정규식 체크 후 불리언값 리턴
*/
export const englishChecked = (str: string) => {
   if(typeof str !== 'string') return console.error('문자열 아님')
//    const regexp = /[^a-zA-Z]/;   
  const regexp = /^[a-zA-Z0-9]*$/;   
  return str.match(regexp) ? true : false;
}

/**
* 영문 체크 (온니 숫자만) 
* @param {Number} str - 체크할 인자
* @returns {Boolean} - 체크 후 불리언값 리턴
*/
export const onlyNumChecked = (str: string) => {
   if(!str) return console.error('인자없음');
   const regexp = /^[0-9]+$/;
   return str.match(regexp) ? true : false;
}

/**
* 영문 체크 (온니 영문만) 
* @param {String} arg - 체크할 인자
* @param {Number} length - 최대 몇글자
* @param {String} type - 문자 or 숫자
* @returns {Boolean} - 체크 후 불리언값 리턴
*/
export const stringLengthChecked = (arg: string, len: number) => {
   if(!arg && typeof arg !== 'string') return console.error('타입 확인')
   if(!arg && typeof arg !== 'number') return console.error('타입 확인')
   return arg.length === len ? true : false;
}


/**
* 로컬스토리지 시간설정
* @param {Number} keyName - 로컬 키  ?? string??
* @param {String} keyValue - 로컬 값 
* @param {Date} exp - ms 단위 시간
* @returns {void}
*/
export const setWithExpire = (keyName: string, keyValue: string, exp: string) => {
   const obj = {
       value : keyValue,
       expire : Date.now() + exp
     }
     const objString = JSON.stringify(obj);
     localStorage.setItem(keyName, objString);
}


/**
* 로컬스토리지 시간설정
* @param {Number} keyName - 로컬 키  ?? string??
* @param {String} keyValue - 로컬 값 
* @param {Date} exp - ms 단위 시간
* @returns {void}
*/
export const getWithExpire = (keyName: string) => {
 const objString = localStorage.getItem(keyName);
 if(!objString) return null;
 const obj = JSON.parse(objString);
 if(Date.now() > obj.expire) {
   localStorage.removeItem(keyName);
   return null;
 }
 return obj.value;
}



/**
* 바이트 계산 : 한글 3 바이트. 영문 1바이트
* @param {string} string - 계산할 문자열
* @returns {number}
*/
export const getByteLengthOfString = function(str: string, b: number, i: number, c: number) {
   for(b = i = 0; c = str.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
   return b;
};
















