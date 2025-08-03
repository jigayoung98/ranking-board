'use client';

import { useState } from 'react';

interface RankingEntry {
  id: number;
  name: string;
  score: number;
  rank: number;
}

export default function Home() {
  const [rankings, setRankings] = useState<RankingEntry[]>([
    { id: 1, name: "김철수", score: 95, rank: 1 },
    { id: 2, name: "이영희", score: 88, rank: 2 },
    { id: 3, name: "박민수", score: 82, rank: 3 },
    { id: 4, name: "정수진", score: 78, rank: 4 },
    { id: 5, name: "최지원", score: 75, rank: 5 },
  ]);

  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  const addNewEntry = () => {
    if (!newName.trim() || !newScore.trim()) return;
    
    const score = parseInt(newScore);
    if (isNaN(score)) return;

    const newEntry: RankingEntry = {
      id: Date.now(),
      name: newName,
      score: score,
      rank: 0
    };

    const updatedRankings = [...rankings, newEntry]
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

    setRankings(updatedRankings);
    setNewName('');
    setNewScore('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 랭킹 보드</h1>
          <p className="text-gray-600">실시간 순위를 확인하세요!</p>
        </div>

        {/* 새로운 점수 추가 폼 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">새로운 점수 추가</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="점수를 입력하세요"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addNewEntry}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              추가
            </button>
          </div>
        </div>

        {/* 랭킹 테이블 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
            <h2 className="text-2xl font-bold">순위표</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    점수
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rankings.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.rank === 1 && (
                          <span className="text-2xl mr-2">🥇</span>
                        )}
                        {entry.rank === 2 && (
                          <span className="text-2xl mr-2">🥈</span>
                        )}
                        {entry.rank === 3 && (
                          <span className="text-2xl mr-2">🥉</span>
                        )}
                        <span className={`font-bold ${
                          entry.rank === 1 ? 'text-yellow-600' :
                          entry.rank === 2 ? 'text-gray-500' :
                          entry.rank === 3 ? 'text-orange-600' :
                          'text-gray-700'
                        }`}>
                          {entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {entry.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">
                        {entry.score}점
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {rankings.length}
            </div>
            <div className="text-gray-600">총 참가자</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {rankings.length > 0 ? Math.max(...rankings.map(r => r.score)) : 0}
            </div>
            <div className="text-gray-600">최고 점수</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {rankings.length > 0 ? Math.round(rankings.reduce((sum, r) => sum + r.score, 0) / rankings.length) : 0}
            </div>
            <div className="text-gray-600">평균 점수</div>
          </div>
        </div>
      </div>
    </div>
  );
}
