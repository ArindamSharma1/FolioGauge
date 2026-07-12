import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const CategoryRadarChart = ({ scan }) => {
    if (!scan || !scan.result || !scan.result.category_scores) {
        return <div className="no-data">No breakdown available.</div>;
    }

    const { category_scores } = scan.result;

    const data = [
        { subject: 'Design', A: category_scores.Design || 0, fullMark: 100 },
        { subject: 'Content', A: category_scores.Content || 0, fullMark: 100 },
        { subject: 'SEO', A: category_scores.SEO || 0, fullMark: 100 },
        { subject: 'Performance', A: category_scores.Performance || 0, fullMark: 100 },
    ];

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <RadarChart outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(56, 189, 248, 0.2)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#f8fafc', fontSize: 12, fontWeight: 600, fontFamily: 'JetBrains Mono' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        fill="#38bdf8"
                        fillOpacity={0.35}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            fontFamily: 'JetBrains Mono'
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryRadarChart;
