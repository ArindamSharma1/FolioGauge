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
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                    />
                    {/* Hide Radius Axis numbers for cleaner look, strictly 0-100 */}
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        fill="#8B5CF6"
                        fillOpacity={0.3}
                    />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryRadarChart;
