import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function SingleOrderTable({orderDetails}) {
  
    const cookies = new Cookies()
    const navigate = useNavigate();
   const[paymentDetails,setPaymentDetails] = React.useState("");
    const multiplyFun = (a, b) => {
        const total = parseFloat(((a * b).toFixed(2)));
        return total
    };
const addressdata = orderDetails.addressData['street'] + " | "+orderDetails.addressData['city']+" |  "+orderDetails.addressData['pin']
   
    React.useEffect(() => {
     
      const fetchPaymentDetails = async () =>{
        const response = await axios.get(`http://localhost:8000/payment/${orderDetails.payment}`)
        .then( e => e.data);
        
        console.log("response data : ",response)

        const addresData = 
        setPaymentDetails({"card":response.cardNumber,"paymentType":response.cardType})
        }

        fetchPaymentDetails();
      
    }, [])
    

    console.log("admin order details : ",orderDetails)
const convertToDateText = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
 return(<> <TableContainer component={Paper}>
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        
       
      <StyledTableCell align="right">ID</StyledTableCell>
        <StyledTableCell align="right">Total</StyledTableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        
           
          <StyledTableRow>
            
          <StyledTableCell align="right">{orderDetails._id}</StyledTableCell>
            <StyledTableCell align="right">{orderDetails.total}</StyledTableCell>
            
            </StyledTableRow>
            
            
        
      </TableBody>
  </Table>
</TableContainer>


<TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        
        {
           <TableBody>
            
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Order ID
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails._id}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Payment Type
                </StyledTableCell>
                <StyledTableCell align="right">{paymentDetails.paymentType}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Card Number 
                </StyledTableCell>
                <StyledTableCell align="right">{paymentDetails.card}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Type
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.deliveryType}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Address
                </StyledTableCell>
                <StyledTableCell align="right">{addressdata}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Status
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.deliveryStatus}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Total
                </StyledTableCell>
                <StyledTableCell align="right">{orderDetails.total} $</StyledTableCell>
            </StyledTableRow>
            
            

          </TableBody>

        }
        
      </Table>
    </TableContainer>







</>)
}
