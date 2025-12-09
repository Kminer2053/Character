# 배포 가이드

## GitHub 레포지토리 생성 및 푸시

### 1. GitHub 레포지토리 생성
1. https://github.com/new 접속
2. 레포지토리 이름 입력 (예: `goyutong-character` 또는 `character-website`)
3. Description: "고유통 캐릭터 홍보 웹페이지"
4. Public 또는 Private 선택
5. **"Initialize this repository with a README" 체크 해제** (이미 파일이 있음)
6. "Create repository" 클릭

### 2. 원격 저장소 연결 및 푸시
레포지토리를 생성한 후, 생성된 GitHub 레포지토리 URL을 사용하여 다음 명령어를 실행하세요:

```bash
git remote add origin https://github.com/[사용자명]/[레포지토리명].git
git branch -M main
git push -u origin main
```

예시:
```bash
git remote add origin https://github.com/hoonsbook/goyutong-character.git
git branch -M main
git push -u origin main
```

## Vercel 배포

### 방법 1: Vercel 웹사이트에서 배포
1. https://vercel.com 접속 및 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 레포지토리 선택
4. 프로젝트 설정:
   - **Framework Preset**: Other (또는 Static Site)
   - **Root Directory**: ./
   - **Build Command**: (비워두기)
   - **Output Directory**: ./
5. "Deploy" 클릭

### 방법 2: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 환경 변수 (필요시)
현재는 정적 웹사이트이므로 환경 변수 설정이 필요 없습니다.

## 배포 후 확인
- 배포 완료 후 Vercel에서 제공하는 URL로 접속
- 모든 섹션이 정상적으로 표시되는지 확인
- 반응형 디자인이 모바일/태블릿에서 잘 작동하는지 확인

