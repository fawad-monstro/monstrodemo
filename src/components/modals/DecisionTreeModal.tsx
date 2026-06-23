import { useAppStore } from '../../store/useAppStore';
import { TREE_META, TREE_LABELS, TREE_NODES, TREE_EDGES } from '../../data/tree';

const NODE_W = 232;
const NODE_H = 66;

function nodeCenter(node: { x: number; y: number }) {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 };
}

export function DecisionTreeModal() {
  const { treeOpen, treeDomain, fidelity, closeTree } = useAppStore();

  if (!treeOpen || !treeDomain) return null;

  const meta = TREE_META[treeDomain] || TREE_META['Tax'];
  const labels = TREE_LABELS[treeDomain] || TREE_LABELS['Tax'];
  const wire = fidelity === 'wire';

  // Compute executed nodes
  const execSet = new Set<string>();
  TREE_EDGES.forEach(e => {
    if (e.executed) {
      execSet.add(e.from);
      execSet.add(e.to);
    }
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: wire ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        maxWidth: 900,
        width: '100%',
        height: 600,
        background: wire ? '#EFEDE7' : '#070B14',
        color: wire ? '#0A0A0A' : 'white',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '14px 20px',
          borderBottom: wire ? '1px solid #ccc' : '1px solid #1A1A2E',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: wire ? '#0A0A0A' : 'white' }}>{meta.title}</p>
            <p style={{ fontSize: 11, fontFamily: 'monospace', color: wire ? '#666' : '#4A4A5A', marginTop: 2 }}>{meta.id}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: wire ? '#666' : '#4A4A5A' }}>
              PR #{meta.pr} · {meta.leaves} leaves · {meta.inputs} inputs
            </span>
            <button
              style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: wire ? '#666' : '#9D9D9D', lineHeight: 1, padding: '4px 8px' }}
              onClick={closeTree}
            >
              ×
            </button>
          </div>
        </div>

        {/* Stage */}
        <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: wire ? '#EFEDE7' : '#070B14' }}>
          {/* Inner canvas */}
          <div style={{ position: 'relative', width: 1300, height: 880, margin: '0 auto' }}>

            {/* SVG edges */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: 1300, height: 880, pointerEvents: 'none' }}>
              {TREE_EDGES.map(edge => {
                const fromNode = TREE_NODES.find(n => n.id === edge.from);
                const toNode = TREE_NODES.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                const fc = nodeCenter(fromNode);
                const tc = nodeCenter(toNode);
                const cy1 = fc.cy + 33;
                const cy2 = tc.cy - 33;
                const d = `M${fc.cx},${fc.cy + 33} C${fc.cx},${cy1 + 60} ${tc.cx},${cy2 - 60} ${tc.cx},${tc.cy - 33}`;
                const edgeColor = edge.executed
                  ? (wire ? '#555' : '#4C8DFF')
                  : (wire ? '#BBB' : '#1A1A2E');
                return (
                  <g key={edge.from + edge.to}>
                    <path
                      d={d}
                      fill="none"
                      stroke={edgeColor}
                      strokeWidth={edge.executed ? 2 : 1.5}
                      strokeDasharray={edge.executed ? undefined : '4 4'}
                    />
                    <text
                      x={(fc.cx + tc.cx) / 2}
                      y={(fc.cy + tc.cy) / 2}
                      fill={edge.executed ? (wire ? '#333' : '#7A9FFF') : (wire ? '#999' : '#333355')}
                      fontSize={10}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {TREE_NODES.map(node => {
              const label = labels[node.id];
              if (!label) return null;
              const [eyebrow, sub, category] = label;
              const isLeaf = node.kind === 'leaf';
              const isOn = execSet.has(node.id);
              const cat = isLeaf ? (category || 'OTHER') : 'DECISION';

              const catColors: Record<string, string> = {
                ELIGIBLE: '#34D399',
                ACTION: '#34D399',
                BACKDOOR: '#C084FC',
                OTHER: '#64748B',
                DECISION: '#4C8DFF',
              };
              const nodeColor = catColors[cat] || '#64748B';

              const wireColor =
                cat === 'DECISION' ? '#333' :
                (cat === 'ELIGIBLE' || cat === 'ACTION') ? '#0E7C5A' :
                '#888';

              const borderColor = wire ? wireColor : (isOn ? nodeColor : '#1A1A2E');
              const bgColor = wire
                ? (isOn ? '#E8E8E8' : '#F8F8F8')
                : (isOn ? nodeColor + '18' : '#0D1117');
              const textColor = wire ? '#0A0A0A' : 'white';

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    width: NODE_W,
                    minHeight: NODE_H,
                    border: wire ? `2px solid ${wireColor}` : `1px solid ${borderColor}`,
                    borderRadius: isLeaf ? 10 : 8,
                    background: bgColor,
                    padding: '10px 14px',
                    boxSizing: 'border-box',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    fontSize: 9,
                    color: wire ? (isOn ? wireColor : '#888') : (isOn ? nodeColor : '#4A4A5A'),
                    textTransform: 'uppercase' as const,
                    letterSpacing: '.06em',
                    fontFamily: 'monospace',
                    marginBottom: 3,
                  }}>
                    {isLeaf ? cat : 'DECISION'}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                    {eyebrow}
                  </div>
                  <div style={{ fontSize: 9, color: wire ? '#888' : '#4A4A5A', fontFamily: 'monospace', marginTop: 3 }}>
                    {sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
