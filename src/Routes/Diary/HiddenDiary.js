import styled from "styled-components";
import {
  boxStyle,
  btnStyle,
  modalBoxStyle,
  solidBtnStyle,
  stokeBtnStyle,
} from "../../styles/commonStyles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../App";

// styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${solidBtnStyle}
`;
const StrokeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  ${stokeBtnStyle}
`;

const ContentBox = styled.div`
  width: 80%;
`;

const DiaryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 70px;
  padding: 100px;
  ${boxStyle}
  overflow-y: auto;
  height: 100%;
`;
const Diary = styled.div`
  position: relative;
  width: 200px;
  height: 230px;
`;
const DiaryTitle = styled.h3`
  font-size: 20px;
  text-align: center;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
`;
const DiaryCover = styled.img`
  width: 100%;
`;
const DiaryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #e84118;
  border-radius: 50%;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 400px;
  padding: 30px;
  ${modalBoxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  span {
    font-size: 25px;
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    width: 70%;
  }
  button {
    width: 100%;
    ${btnStyle}
  }
`;

export default function HiddenDiary() {
  const [hiddenDiaries, setHiddenDiaries] = useState([]);

  const [showBtn, setShowBtn] = useState(null);
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 숨김해제, 삭제 버튼 클릭 시
  const onBtnClick = (mode) => {
    if (showBtn === mode) {
      setShowBtn(null);
    } else {
      setShowBtn(mode);
    }
  };
  const handleYesClick = async () => {
    try {
      if (showBtn === "notHidden") {
        await axios.put(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("숨김 해제 성공");
      }
      if (showBtn === "delete") {
        await axios.delete(
          `${HOST_URL}/diaries/${selectedDiaryId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("삭제 성공");
      }
    } catch (error) {
      console.error("일기장 숨김 삭제 중 오류 발생:", error);
    } finally {
      setShowModal(false);
      setShowBtn(null);
      setSelectedDiaryId(null);
    }
  };

  // 숨긴 일기장 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/auth/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setHiddenDiaries(response.data.data.hiddenDiaries);
      } catch (error) {
        console.error("fetch 오류:", error);
      }
    };

    fetchData();
  }, [showModal]);

  return (
    <Wrapper>
      <BtnWrapper>
        <Link to="/mypage">
          <SolidBtn className="mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </SolidBtn>
        </Link>

        <StrokeBtn onClick={() => onBtnClick("notHidden")}>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#4d9cd0"
            strokeWidth="2"
          >
            <path
              d="M3 13C6.6 5 17.4 5 21 13"
              stroke="#4d9cd0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
              fill="#4d9cd0"
              stroke="#4d9cd0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </StrokeBtn>
        <StrokeBtn onClick={() => onBtnClick("delete")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4d9cd0"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
        </StrokeBtn>
      </BtnWrapper>

      <ContentBox>
        <h1 className="text-5xl pb-[20px]">숨긴 일기장</h1>
        <DiaryBox>
          {hiddenDiaries?.map((diary) => (
            <Diary key={diary.id}>
              {showBtn === "notHidden" ? (
                <DiaryBtn
                  onClick={() => {
                    setSelectedDiaryId(diary.id);
                    setShowModal(true);
                  }}
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#fff"
                    strokeWidth="2"
                  >
                    <path
                      d="M3 13C6.6 5 17.4 5 21 13"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
                      fill="#fff"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </DiaryBtn>
              ) : null}
              {showBtn === "delete" ? (
                <DiaryBtn
                  onClick={() => {
                    setSelectedDiaryId(diary.id);
                    setShowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DiaryBtn>
              ) : null}
              <DiaryTitle>{diary.title}</DiaryTitle>
              <Link to={`/diaries/${diary.id}/pages`}>
                <DiaryCover
                  src={`/image/${diary.color}.png`}
                  alt={diary.title}
                />
              </Link>
            </Diary>
          ))}
        </DiaryBox>
      </ContentBox>

      {showModal ? (
        <ModalBox>
          <h3>alert</h3>
          <span>
            {showBtn === "notHidden"
              ? "일기장 숨김해제 할거니?????"
              : showBtn === "delete"
              ? "일기장 진짜 삭제할거니??????"
              : null}
          </span>
          <div className="btnBox">
            <button onClick={handleYesClick}>YES</button>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedDiaryId(null);
              }}
            >
              NO
            </button>
          </div>
        </ModalBox>
      ) : null}
    </Wrapper>
  );
}
