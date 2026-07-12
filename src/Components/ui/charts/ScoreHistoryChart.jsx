import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ScoreHistoryChart = ({ data }) => {
    // Process data: extract date and score
    // Assumes data is sorted descending, so reverse for chart (oldest -> newest)
    const chartData = [...data].reverse().map(scan => ({
        date: new Date(scan.created_at).toLocaleDateString(),
        score: scan.score
    }));

    if (chartData.length === 0) {
        return <div className="no-data">No scans found.</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(56, 189, 248, 0.15)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'JetBrains Mono' }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'JetBrains Mono' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)',
                            fontFamily: 'JetBrains Mono'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#38bdf8"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#080a0f' }}
                        activeDot={{ r: 6, fill: '#38bdf8' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScoreHistoryChart;
