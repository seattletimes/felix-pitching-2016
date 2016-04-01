SELECT x, y, type, COUNT(x) AS count FROM (

SELECT 
  ROUND(CAST(px AS numeric), 1) AS x,
  ROUND(CAST(pz AS numeric), 1) AS y,
  pitch_type AS type--,
  --DATE_PART('year', games.date) AS year
FROM pitches
LEFT JOIN games ON games.id = pitches.game
WHERE px != 'NaN'
  AND pitcher = '433587'
  -- AND pitch_confidence >= 1
  -- AND designation ILIKE '%in play%'
) AS pitch_coords
GROUP BY x, y, type
ORDER BY type, count DESC, x, y
