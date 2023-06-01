import React, { useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from './LoginContext';
import './css/ResultSheet.css';

// 새로 작성하는 리뷰 서버에 post하는 컴포넌트
function ReviewUpdate({ onReviewSubmit }) {
  
  const { loggedInUser } = useContext(LoginContext);
  const [reviewText, setReviewText] = useState('');

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };
  
  // {id, 새로운 리뷰 텍스트} json 생성 
  const newReview_json = JSON.stringify({"id":loggedInUser,"text":reviewText})
  //console.log(newReview_json)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 서버로 {id, text}를 post
    axios.post('http://', { newReview_json })
      .then(function (response) {
        alert("리뷰가 등록되었습니다.");
      })
      .catch(function (error) {
        console.error("리뷰 작성 중 오류가 발생했습니다.", error);
        
      })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={reviewText} onChange={handleChange} placeholder="리뷰를 자유롭게 남겨주세요!"></textarea>
        <button id="review-upload-btn" type="submit">작성</button>
      </form>
    </div>
  );
}

export default ReviewUpdate;