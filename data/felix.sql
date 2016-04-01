select pitch_type as type, date_part('year', games.date) as year, avg(start_speed)
from pitches
left join games on games.id = pitches.game
where 
pitcher = '433587'
and start_speed is not null
-- and pitch_confidence >= 1
and pitch_type is not null
group by year, type
order by year