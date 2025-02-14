# 📚 책 관리 시스템 (Book Management System)

> **🛠️ TypeScript, React Query, Supabase, Next.js를 활용한 책 관리 시스템**  
> **📌 동적 메타데이터 생성, 캐싱 및 최신화(Invalidate Query), CRUD 기능 포함**

---

## 🏗️ 개요

**Next.js 14 (App Router)** 를 기반으로 한 **책 관리 시스템**으로,  
책의 **추가, 조회, 수정, 삭제** 기능을 제공합니다.  
또한, **React Query**를 이용한 데이터 캐싱 및 최신화 기능을 적용하여 **효율적인 데이터 처리**를 지원합니다.

---

## 🚀 기술 스택

| 기술             | 설명                                           |
| ---------------- | ---------------------------------------------- |
| **Next.js 14**   | App Router 사용, 동적 메타데이터 적용          |
| **TypeScript**   | 정적 타입 사용                                 |
| **React Query**  | 데이터 캐싱 및 `invalidateQueries` 적용        |
| **Supabase**     | 백엔드 데이터베이스 및 API 연동                |
| **Ant Design**   | UI 메시지 (`message.success`, `message.error`) |
| **Tailwind CSS** | 스타일링                                       |

---

## 📂 폴더 구조

📂 src  
┣ 📂 app  
┃ ┣ 📂 [id]  
┃ ┃ ┣ 📜 page.tsx # 특정 책 상세 페이지  
┃ ┣ 📂 add  
┃ ┃ ┣ 📜 page.tsx # 책 추가 페이지  
┃ ┣ 📂 api  
┃ ┃ ┣ 📂 books  
┃ ┃ ┃ ┣ 📜 route.ts # API 라우트 (책 관련 처리)  
┃ ┣ 📂 edit  
┃ ┃ ┣ 📂 [id]  
┃ ┃ ┃ ┣ 📜 page.tsx # 특정 책 수정 페이지  
┃ ┣ 📜 globals.css # 전역 스타일  
┃ ┣ 📜 layout.tsx # 페이지 레이아웃 설정  
┃ ┣ 📜 page.tsx # 메인 페이지  

┣ 📂 components  
┃ ┣ 📂 hooks  
┃ ┃ ┣ 📜 useBooks.ts # React Query 기반 데이터 처리 (CRUD)  
┃ ┣ 📜 AddBookForm.tsx # 책 추가 폼 컴포넌트  
┃ ┣ 📜 BookDetail.tsx # 책 상세 정보 컴포넌트  
┃ ┣ 📜 BooksTable.tsx # 책 목록 테이블 컴포넌트  
┃ ┣ 📜 EditBookForm.tsx # 책 수정 폼 컴포넌트  
┃ ┣ 📜 Pagination.tsx # 페이지네이션 컴포넌트  
┃ ┣ 📜 SearchBar.tsx # 검색 바 컴포넌트  

┣ 📂 lib  
┃ ┣ 📜 ReactQueryProvider.tsx # React Query 설정  
┃ ┣ 📜 supabaseClient.ts # Supabase 클라이언트 설정  

---

## 📑 테이블 구조 (Supabase)

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

id → 고유한 책 식별자 (UUID)
title → 책 제목
author → 저자
price → 가격 (숫자)
stock → 재고 (정수)
created_at → 생성 날짜 (기본값: 현재 시간)
```

---

## URL ( 배포 : Vercel )

---

## 시작 가이드

### Requirements

- Node.js
- npm

### Installation

```bash
$ git clone https://github.com/mmm7k/RGT-.git
$ npm install
$ npm run dev

```
