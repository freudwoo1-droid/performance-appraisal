"use client";
// -------------------------------------------------------------------------
// APOLLON 시스템: 이력서 분석 프론트엔드 (Next.js/React)
// 컴포넌트명: App (단일 파일 원칙에 따라 main component로 설정)
// -------------------------------------------------------------------------
import React, { useState } from 'react';
import { FileText, Upload, TrendingUp, Zap, Target, AlertCircle, CheckCircle, XCircle, Flame, Heart } from 'lucide-react';

// NOTE: The main component is renamed to App for single-file React/JSX environment compatibility.
export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mode, setMode] = useState('professional'); // 'professional' or 'ruthless'
  
  // RLS 경고: 실제 프로덕트 레벨에서는 alert() 대신 Modal을 사용해야 합니다.
  const analyzeResume = () => {
    if (!resumeText.trim()) {
      // alert('이력서 내용을 입력해주세요.'); // APOLLON: alert() 사용 금지. 실제로는 Modal을 띄웁니다.
      setAnalysis({ error: true, message: '이력서 내용을 입력해주세요.' });
      return;
    }
    
    // P1 지침: 이 분석 로직은 클라이언트에 하드코딩되면 안 됩니다.
    // 실제 배포 시에는 Next.js Server Component나 API Route를 통해
    // 외부 LLM API 또는 Supabase Edge Function을 호출해야 합니다.
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Mock Data: 실제 LLM API 호출 (예: Gemini API)로 대체되어야 합니다.
      const mockAnalysis = mode === 'professional' ? {
        executability: {
          score: 8,
          analysis: '지원자는 React 기반 웹 프로젝트를 완성하여 GitHub에 배포한 경험이 있음. 팀 프로젝트에서 백엔드 API 설계를 단독으로 수행하고 문서화까지 완료한 점이 주목할 만함. 다만, 프로젝트 규모가 작고 실사용자 피드백 반영 경험은 없음.',
          evidence: '"React + Node.js 기반 실시간 채팅 애플리케이션 개발, GitHub Pages 배포 및 10명 이상 테스트 완료"',
        },
        learning: {
          score: 9,
          analysis: '지원자는 Python만 알던 상태에서 2개월 만에 JavaScript, React, Node.js를 독학하여 풀스택 프로젝트를 완성함. 공식 문서와 StackOverflow를 활용한 자발적 학습 의지가 명확하며, 학습한 내용을 즉시 프로젝트에 적용하는 속도가 빠름.',
          evidence: '"Python 기반 배경에서 출발하여 MERN 스택 습득 후 2주 만에 첫 웹 애플리케이션 프로토타입 완성"',
        },
        fit: {
          score: 7,
          analysis: '지원자의 백엔드 설계 경험과 문서화 습관은 현재 프로젝트(API 표준화 작업)에 적합함. 다만, 협업 툴(Jira, Confluence) 사용 경험이 명시되지 않아 초기 온보딩에 시간이 필요할 것으로 예상. 꼼꼼한 성격은 장점이나 속도가 느릴 가능성 있음.',
          evidence: '"API 명세서를 Swagger로 작성하고 팀원들에게 공유하여 개발 시간 30% 단축"',
        },
        recommendation: 'interview',
        recommendationText: '추가 정보 요청 후 면접 (Medium Signal)',
        reasoning: '기술적 기반은 양호하나, 실전 경험과 협업 능력에 대한 추가 검증이 필요함. 면접을 통해 문제 해결 능력과 커뮤니케이션 스킬을 확인할 것을 권장함.',
        killerQuestion: '"당신이 개발한 채팅 애플리케이션에서 동시 접속자가 100명에서 1000명으로 늘어났을 때 발생할 수 있는 성능 병목 지점 3가지와 각각의 해결 방법을 설명해주세요."',
        additionalQuestions: [
          '팀 프로젝트에서 의견 충돌이 발생했을 때 어떻게 해결하셨나요?',
          'API 문서화로 30% 단축했다는 측정 방법을 구체적으로 설명해주세요.',
          '새로운 기술을 학습할 때 주로 어떤 방식을 사용하시나요?'
        ]
      } : { // Ruthless Mode Data
        executability: {
          score: 5,
          analysis: '"React 프로젝트 완성"이라는 표현은 모호하다. GitHub에 올렸다는 게 배포인가? 10명 테스트? 친구들 불러서 한 번 켜본 게 테스트 유저 확보인가? "백엔드 API 설계를 단독으로 수행"이라는데, CRUD 몇 개 만든 걸 설계라고 부르는 건 아닌지 의심스럽다. 결과물의 실체가 불명확하고, 실사용자의 실제 피드백이나 비즈니스 임팩트는 전혀 없다.',
          evidence: '"React + Node.js 기반 실시간 채팅 애플리케이션 개발" - 실시간의 정의가 무엇인가? WebSocket인가 폴링인가? 동시 접속자 처리 경험은?'
        },
        learning: {
          score: 6,
          analysis: '2개월 만에 JavaScript, React, Node.js를 독학했다고? 유튜브 튜토리얼 3개 따라한 거 아닌가? "공식 문서와 StackOverflow 활용"은 모든 개발자가 하는 기본이다. 이걸 자랑처럼 쓰는 것 자체가 주니어 티를 낸다. 2주 만에 프로토타입? 그게 실제로 작동하는 코드인지, 아니면 console.log로 도배된 스파게티 코드인지 알 수 없다. 학습 속도보다 학습의 깊이가 의심스럽다.',
          evidence: '"MERN 스택 습득 후 2주 만에 프로토타입" - 프로토타입의 품질 기준이 무엇인가? 에러 핸들링은? 보안은? 테스트는?'
        },
        fit: {
          score: 4,
          analysis: '"API 명세서를 Swagger로 작성하여 개발 시간 30% 단축"이라는 주장의 측정 방법론이 전혀 제시되지 않았다. Before/After 데이터는? 팀 규모는? Swagger 하나 써봤다고 문서화 습관이라고 부를 수 있는가? 협업 툴 경험 없음. 대규모 코드베이스 경험 없음. 실제 트래픽 처리 경험 없음. 현재 시스템에 투입 시 온보딩 3주, 실전 기여까지 최소 3개월 소요 예상. 착한 사람일 수는 있지만, 지금 당장 필요한 사람은 아니다.',
          evidence: '"꼼꼼한 성격" - 자기 평가는 의미 없다. 코드 리뷰 경험은? 버그 추적 능력은? 데드라인 압박 상황에서의 대처는?'
        },
        recommendation: 'reject',
        recommendationText: '보류 또는 불합격 (Low Signal)',
        reasoning: '전반적으로 주관적 표현과 측정 불가능한 주장으로 가득 차 있다. 구체적인 기술 스택의 깊이, 실전 경험, 문제 해결 능력을 입증할 증거가 부족하다. "했다"는 많지만 "어떻게 했고 무엇을 배웠는가"는 없다. 6개월 내 실질적 기여 가능성: 30% 미만.',
        killerQuestion: '당신의 채팅 애플리케이션이 배포 3일 만에 서버가 다운됐습니다. 새벽 3시, CPU 100%, 메모리 누수 의심, 사용자 환불 요구 중입니다. 당신 혼자입니다. 지금부터 30분 안에 무엇을 하겠습니까? 구체적인 명령어, 로그 확인 방법, 임시 조치, 근본 원인 파악 순서를 말하세요. "찾아본다"는 답은 불합격입니다.',
        additionalQuestions: [
          '"실시간 채팅"이라고 했는데, 메시지 전송 지연이 5초 발생한다면 어디서부터 디버깅하겠습니까?',
          'API 문서화로 30% 단축했다는 측정 근거를 제시하세요. Before/After 데이터가 있습니까?',
          '동시 접속자 1000명 환경에서 당신의 코드는 작동합니까? 부하 테스트를 해봤습니까?'
        ]
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // 점수별 색상 로직
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // 점수별 배경 색상 로직
  const getScoreBg = (score) => {
    if (score >= 8) return 'bg-green-50 border-green-200';
    if (score >= 6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };
  
  // 권고 아이콘 로직
  const getRecommendationIcon = (type) => {
    if (type === 'accept') return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (type === 'interview') return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };
  
  // 권고 스타일 로직
  const getRecommendationStyle = (type) => {
    if (type === 'accept') return 'bg-green-50 border-green-300 text-green-900';
    if (type === 'interview') return 'bg-yellow-50 border-yellow-300 text-yellow-900';
    return 'bg-red-50 border-red-300 text-red-900';
  };
  
  const isDark = mode === 'ruthless';
  
  // Error handling for initial prompt check
  if (analysis && analysis.error) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{analysis.message}</span>
            </div>
        </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-8 ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className={`rounded-2xl shadow-lg p-6 sm:p-8 mb-6 ${isDark ? 'bg-slate-800 border-2 border-red-900' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isDark ? <Flame className="w-8 h-8 text-red-500" /> : <FileText className="w-8 h-8 text-slate-700" />}
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {isDark ? '무자비한 채용 분석 시스템' : '이력서 분석 시스템'}
                </h1>
                <p className={`text-sm font-medium mt-1 ${isDark ? 'text-red-400' : 'text-slate-600'}`}>
                  {isDark ? '불필요한 미사여구 제거. 오직 6개월 내 성과 가능성만 평가.' : '효율적이고 객관적인 신입 지원자 평가를 위한 AI 기반 채용 분석 도구'}
                </p>
              </div>
            </div>
          </div>
          {/* 모드 전환 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => setMode('professional')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${mode === 'professional' ? 'bg-blue-600 text-white shadow-lg' : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            >
              <Heart className="w-4 h-4" />
              전문적 모드
            </button>
            <button
              onClick={() => setMode('ruthless')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${mode === 'ruthless' ? 'bg-red-600 text-white shadow-lg' : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            >
              <Flame className="w-4 h-4" />
              무자비 모드
            </button>
          </div>
          {/* 무자비 모드 경고 문구 */}
          {isDark && (
            <div className="mt-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-3">
              <p className="text-red-300 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                ⚠️ 상처받지 마세요. 사실은 착해요. (시스템이 무자비할 뿐입니다)
              </p>
            </div>
          )}
        </div>
        {/* 메인 컨텐츠 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 입력 영역 */}
          <div className={`rounded-2xl shadow-lg p-6 sm:p-8 ${isDark ? 'bg-slate-800 border-2 border-slate-700' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Upload className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>이력서 입력</h2>
            </div>
                        <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={isDark 
                ? "지원자의 이력서/자기소개서 전문을 붙여넣으세요.\n\n경고: 주관적 표현, 측정 불가능한 주장, 모호한 성과는 가차없이 지적됩니다.\n\n예시:\n- 프로젝트 경험 (구체적 기술 스택, 규모, 성과)\n- 학습 경험 (기간, 방법, 적용 사례)\n- 문제 해결 경험 (Before/After 데이터)\n- 협업 경험 (툴, 규모, 역할)"
                : "지원자의 이력서 또는 자기소개서 전문을 붙여넣으세요...\n\n예시:\n- 학력, 경력\n- 프로젝트 경험\n- 기술 스택\n- 자격증, 수상 이력\n- 자기소개"
              }
              className={`w-full h-96 p-4 rounded-xl resize-none focus:outline-none transition-colors font-mono text-sm ${isDark 
                ? 'bg-slate-900 border-2 border-slate-600 text-slate-200 focus:border-red-500 placeholder-slate-500' 
                : 'border-2 border-slate-200 focus:border-slate-400'}`}
            />
            <button
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className={`w-full mt-4 font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg ${isDark 
                ? 'bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-600' 
                : 'bg-slate-800 hover:bg-slate-900 text-white disabled:bg-slate-400'}`}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  분석 중...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  {isDark ? '냉혹한 분석 시작' : '분석 시작'}
                </>
              )}
            </button>
          </div>
          {/* 결과 영역 */}
          <div className={`rounded-2xl shadow-lg p-6 sm:p-8 ${isDark ? 'bg-slate-800 border-2 border-slate-700' : 'bg-white'}`}>
            {!analysis || analysis.error ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Target className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-center">이력서를 입력하고 {isDark ? '무자비한 평가' : '분석'}를 시작하세요</p>
                {isDark && <p className="text-xs text-slate-500 mt-2">감정은 고려되지 않습니다</p>}
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className={`text-xl font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TrendingUp className={`w-5 h-5 ${isDark ? 'text-red-500' : ''}`} />
                  {isDark ? '냉혹한 현실' : '분석 결과'}
                </h2>
                {/* 지표 A */}
                <div className={`border-2 rounded-xl p-5 ${getScoreBg(analysis.executability.score)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-slate-900`}>A. 실행 가능성</h3>
                    <span className={`text-2xl font-black ${getScoreColor(analysis.executability.score)}`}>
                      {analysis.executability.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-slate-800 mb-3 leading-relaxed font-medium">
                    {analysis.executability.analysis}
                  </p>
                  <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-900 bg-opacity-40 border-slate-700' : 'bg-white bg-opacity-60 border-slate-200'}`}>
                    <p className="text-xs font-bold text-slate-700 mb-1">{isDark ? '비판적 검증:' : '결정적 문구:'}</p>
                    <p className="text-sm text-slate-800 font-medium">{analysis.executability.evidence}</p>
                  </div>
                </div>
                {/* 지표 B */}
                <div className={`border-2 rounded-xl p-5 ${getScoreBg(analysis.learning.score)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900">B. 학습 속도</h3>
                    <span className={`text-2xl font-black ${getScoreColor(analysis.learning.score)}`}>
                      {analysis.learning.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-slate-800 mb-3 leading-relaxed font-medium">
                    {analysis.learning.analysis}
                  </p>
                  <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-900 bg-opacity-40 border-slate-700' : 'bg-white bg-opacity-60 border-slate-200'}`}>
                    <p className="text-xs font-bold text-slate-700 mb-1">{isDark ? '비판적 검증:' : '결정적 문구:'}</p>
                    <p className="text-sm text-slate-800 font-medium">{analysis.learning.evidence}</p>
                  </div>
                </div>
                {/* 지표 C */}
                <div className={`border-2 rounded-xl p-5 ${getScoreBg(analysis.fit.score)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900">C. 시스템 적합성</h3>
                    <span className={`text-2xl font-black ${getScoreColor(analysis.fit.score)}`}>
                      {analysis.fit.score}/10
                    </span>
                  </div>
                  <p className="text-sm text-slate-800 mb-3 leading-relaxed font-medium">
                    {analysis.fit.analysis}
                  </p>
                  <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-900 bg-opacity-40 border-slate-700' : 'bg-white bg-opacity-60 border-slate-200'}`}>
                    <p className="text-xs font-bold text-slate-700 mb-1">{isDark ? '비판적 검증:' : '결정적 문구:'}</p>
                    <p className="text-sm text-slate-800 font-medium">{analysis.fit.evidence}</p>
                  </div>
                </div>
                {/* 최종 권고 */}
                <div className={`border-2 rounded-xl p-5 ${getRecommendationStyle(analysis.recommendation)}`}>
                  <div className="flex items-center gap-3 mb-3">
                    {getRecommendationIcon(analysis.recommendation)}
                    <h3 className="font-black text-lg">{isDark ? '최종 판결' : '최종 권고'}</h3>
                  </div>
                  <p className="font-bold text-base mb-2">{analysis.recommendationText}</p>
                  <p className="text-sm leading-relaxed mb-4 font-medium">{analysis.reasoning}</p>
                                    <div className={`rounded-lg p-4 border-2 border-current border-opacity-40 mb-3 ${isDark ? 'bg-slate-900 bg-opacity-50' : 'bg-white bg-opacity-70'}`}>
                    <p className="text-xs font-bold mb-2 flex items-center gap-2">
                      {isDark && <Flame className="w-4 h-4" />}
                      {isDark ? '무자비한 실무 질문:' : '면접용 실무 질문:'}
                    </p>
                    <p className="text-sm font-bold leading-relaxed">{analysis.killerQuestion}</p>
                  </div>
                  {analysis.additionalQuestions && (
                    <div className={`rounded-lg p-3 border border-current border-opacity-30 ${isDark ? 'bg-slate-900 bg-opacity-30' : 'bg-white bg-opacity-50'}`}>
                      <p className="text-xs font-bold mb-2">{isDark ? '추가 압박 질문:' : '추가 확인 질문:'}</p>
                      <ul className="text-xs space-y-1">
                        {analysis.additionalQuestions.map((q, i) => (
                          <li key={i} className="font-medium">• {q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 푸터 */}
        <div className={`mt-6 text-center text-sm border-t-2 pt-4 ${isDark ? 'text-slate-400 border-slate-700' : 'text-slate-500 border-slate-200'}`}>
          <p className="font-medium">
            {isDark
              ? '본 시스템은 효율성을 최우선으로 합니다. 감정적 배려는 제공되지 않습니다.'
              : '본 시스템은 채용 프로세스의 효율성을 위한 보조 도구입니다. 최종 결정은 면접관의 판단이 우선합니다.'
            }
          </p>
          {isDark && (
            <p className="text-xs text-slate-500 mt-1">
              최종 결정권은 면접관에게 있으나, 이 분석을 무시할 경우 책임은 면접관에게 있습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
