import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import defaultImage from '../../../assets/images/default_image_footballField.jpg';
import placeholderIcon from '../../../assets/images/placeholder.png';
import starIcon from '../../../assets/images/star.png';

export default function ReUseableCard({
  id,
  name = 'Sân Đa Phước',
  district = 'Quận Thanh Khê',
  rating = 5,
  openingHours = '5:00 - 23:00',
  isHot = false,
  image
}) {
  const cardImage = image || defaultImage;

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Image Container with HOT Badge */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          alt={name}
          image={cardImage}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* HOT Badge - chỉ hiển thị khi isHot = true */}
        {isHot && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 60,
              height: 30,
              backgroundColor: '#df1b3f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              HOT
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Thời gian mở cửa */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.875rem',
          }}
        >
          {openingHours}
        </Typography>

        {/* Tên sân */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.25rem',
          }}
        >
          {name}
        </Typography>

        {/* Khu vực với icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={placeholderIcon}
            alt="location"
            sx={{
              width: 24,
              height: 24,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.875rem',
            }}
          >
            {district}
          </Typography>
        </Box>

        {/* Rating với icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={starIcon}
            alt="rating"
            sx={{
              width: 24,
              height: 24,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {rating}
          </Typography>
        </Box>

        {/* Description (optional) */}
        
      </CardContent>
    </Card>
  );
}
