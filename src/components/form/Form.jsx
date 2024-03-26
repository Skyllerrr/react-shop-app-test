import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './Form.module.scss'

const Form = ({ title, getDataForm, firebaseError }) => {

  // 이메일과 패스워드를 입력했을 때 유효성 검사를 해주는 Form hook이다.
  // useForm({ mode: 'onBlur' })는 예를 들어, 사용자가 이메일이나 비밀번호를 조건에 맞지않게 타이핑 후 다른 곳을 눌렀을 때(블러) 오류 메세지가 뜸
  // useForm({ mode: 'onChange' })는 예를 들어, 사용자가 이메일이나 비밀번호를 조건에 맞지않게 타이핑을 하자마자(체인지) 실시간으로 해당하는 오류 메세지가 뜸
  // reset함수는 모든 정보를 입력한 후, 로그인을 눌렀을 때 input부분에 빈칸으로 다시 되돌리도록 만드는 함수이다.
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onChange'
  })

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password)
    // 유효성 검사를 통해 올바른 입력정보가 들어가야 reset()함수가 적용이 됨
    reset()
  }

  const userEmail = {
    required: "필수 필드입니다.",
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: "입력하신 이메일 주소가 올바르지 않습니다."
    }
  }

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 8,
      message: "최소 8자입니다."
    },
    maxLength: {
      value: 13,
      message: "최대 13자입니다."
    },
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message: "비밀번호는 최소 8자 이상 최대 13자 이하여야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input
          type="email"
          placeholder='E-mail'
          {...register("email", userEmail)}
        />
        {errors?.email &&
          <div>
            <span className={styles.form_error}>
              {errors.email.message}
            </span>
          </div>
        }
      </div>
      <div>
        <input
          type="password"
          placeholder='Password'
          {...register("password", userPassword)}
        />
        {errors?.password &&
          <div>
            <span className={styles.form_error}>
              {errors.password.message}
            </span>
          </div>
        }
      </div>
      <button type='submit'>{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  )
}

export default Form