import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../../components/form/Form'
import app from '../../../firebase'

const SignIn = () => {
  const navigate = useNavigate()
  const [firebaseError, setFirebaseError] = useState("")

  // signInWithEmailAndPassword() 함수는 firebase에서 제공해주는 로그인시 이메일과 패스워드 저장 함수
  const auth = getAuth(app)
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
      navigate('/')
      })
      .catch(error => {
      return error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.")
    })
  }

  return (
    <Form
      title={'로그인'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  )
}

export default SignIn