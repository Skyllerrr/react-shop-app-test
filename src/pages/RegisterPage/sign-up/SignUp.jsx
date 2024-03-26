import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form/Form'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../../../firebase'

const SignUp = () => {
  const navigate = useNavigate()
  const [firebaseError, setFirebaseError] = useState("")

  // getAuth()는 firebase에서 제공해주는 함수
  const auth = getAuth(app)

  // createUserWithEmailAndPassword() 함수는 firebase에서 제공해주는 회원가입시 이메일과 패스워드 저장 함수
  const handleSignupAndLogin = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
      // 리덕스 스토어에 담는 로직
      
        navigate('/')
      })
      .catch(error => {
      return error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
    })
  }

  return (
    <Form
      title={'가입하기'}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  )
}

export default SignUp