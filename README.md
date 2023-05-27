# テンプレート動画生成

あらかじめ動きが決まった動画のテンプレートを選択し、  
好きな写真や文字を追加して動画を生成することができます。  
(Remotion & Line-bot 検証用プロジェクト)

![count up](https://firebasestorage.googleapis.com/v0/b/lapin-pos.appspot.com/o/avant-gif-1.gif?alt=media&token=541fc009-c066-483a-978e-332a0f8b4a9b)

# URL

https://remotion-nextjs.vercel.app/

# 使用方法概要

1. ログイン
2. テンプレートを選択
3. 画面下部のタイムラインから編集したい`シーンを選択`
4. 画面右のテキストエリアで`文字を変更`
5. 画面右`テキストエリア下部の画像`をクリックして画像を変更
6. 画面左下の`オレンジボタン`から音楽を変更
7. 再生ボタンで最終確認し、OK であれば画面右上の`Render`ボタンを押下
8. 書き出しが終わったらモーダルの`ダウンロードボタン`を押す

# 目指した課題解決

映像業界の仕事の中で、ある程度フォーマットが決まった映像ジャンルがいくつかある。  
(デジタルサイネージ、電車広告、結婚式、表彰式、イベント用映像等)  
そのようなフォーマットが決まっている映像コンテンツを、特殊なソフトを使わず誰でも簡単に制作・更新することができないかと考えた。

# 使用技術

### **フロントエンド**

- Next.js
- Typescript
- Remotion
- line/bot-sdk
- TailwindCSS
- Mantine
- React Hook Form
- Redux Toolkit
- Jotai
- React Query
- prettier

### **デプロイ先**

- Vercel

### **バックエンド**

- Supabase
- AWS Lambda

### **機能一覧**

- ログイン(Google)
- 文字の変更
- 写真の変更
- 音楽の変更
- Line から画像送信し、ウェブアプリ内の画像変更
