// EFmodoki_1.1

int Nmax = 6 ; float R = 20 ; float FPE = 3000 ; float M = 1.0 ; float K = 0.5 ; float H = 0.95 ; float Vmax = 5 ;

float X[] = new float[Nmax] ; float Y[] = new float[Nmax] ;
float FX[] = new float[Nmax] ; float FY[] = new float[Nmax] ;
float VX[] = new float[Nmax] ; float VY[] = new float[Nmax] ;
int Q[] = new int[Nmax] ; int OKNG ;
float L ; float KX ; float KY ; float DX ; float DY ; 
int N ; int I ; int II ; int III ; int W ; float A ;



void setup(){
  
  size(800, 400) ;
  noSmooth() ; 
  stroke(255,255,255) ; 
  strokeWeight(1.5) ;
  X[0] = 200 ; Y[0] =200 ; Q[0] = +1 ;
	X[1] = 600 ; Y[1] =200 ; Q[1] = -1 ;
  N = 1 ; VX[0] = 0 ; VY[0] = 0 ;
   
} // setup()



void draw(){
  
  background(0,0,0);
  cursor(HAND);
  noFill() ;
  rect(0,0, 800,400);
  
  for ( III = 0 ; III <= N ; III++ ){
    for ( I = 0 ; I < 24 ; I++ ){
      KX = X[III]+(R*cos(I*2*PI/24)) ;
      KY = Y[III]+(R*sin(I*2*PI/24)) ; 
      W = 0 ;
      while( W == 0 ){
        DX = 0 ; DY = 0 ;
        for ( II = 0 ; II <= N ; II++ ){
          L = sqrt(((KX-X[II])*(KX-X[II]))+((KY-Y[II])*(KY-Y[II]))) ;
          if ( L < R*0.9 ){ 
            W = 1 ;            
          }else{
            DX = DX + (Q[II]*FPE*(KX-X[II])/(L*L*L)) ;
            DY = DY + (Q[II]*FPE*(KY-Y[II])/(L*L*L)) ;
          }
        } // II
        L = sqrt((DX*DX)+(DY*DY)) ; 
        if ( L < 0.001 ){ 
          W = 1 ;
          DX = 0 ; DY = 0 ; 
        }else{
          DX = Q[III]*2.5*(DX/L) ; DY = Q[III]*2.5*(DY/L) ;
        }
        line(KX,KY,KX+DX,KY+DY) ; 
        KX = KX + DX ; KY = KY + DY ;
        if ( KX > 800 || KX < 0 || KY > 800 || KY < 0 ){ W = 1 ; }
      }// W
    } // I
  } // III
  
  for ( I = 0 ; I <= N ; I++ ){
    if ( Q[I] > 0 ){ fill(255,0,0) ; }else{ fill(0,0,255) ; }
    ellipse(X[I],Y[I],R*2,R*2) ; 
    for ( II = I+1 ; II <= N ; II++ ){
      L = sqrt(((X[I]-X[II])*(X[I]-X[II]))+((Y[I]-Y[II])*(Y[I]-Y[II]))) ;
      FX[I] = FX[I] + (Q[I]*Q[II]*FPE*(X[I]-X[II])/(L*L*L)) ;
      FY[I] = FY[I] + (Q[I]*Q[II]*FPE*(Y[I]-Y[II])/(L*L*L)) ;
      FX[II] = FX[II] - (Q[I]*Q[II]*FPE*(X[I]-X[II])/(L*L*L)) ;
      FY[II] = FY[II] - (Q[I]*Q[II]*FPE*(Y[I]-Y[II])/(L*L*L)) ;
      if ( L < 2*R ){
        FX[I] = FX[I] - (((X[II]-X[I])/L)*(K*(2*R-L))) ;
        FY[I] = FY[I] - (((Y[II]-Y[I])/L)*(K*(2*R-L))) ;
        FX[II] = FX[II] + (((X[II]-X[I])/L)*(K*(2*R-L))) ;
        FY[II] = FY[II] + (((Y[II]-Y[I])/L)*(K*(2*R-L))) ; 
      }
    }// II
    VX[I] = (VX[I]+(FX[I]/M))*H ; VY[I] = (VY[I]+(FY[I]/M))*H ; 
    L = sqrt((VX[I]*VX[I])+(VY[I]*VY[I])) ;
    if ( L > Vmax ){
      VX[I] = VX[I] * (Vmax/L) ; VY[I] = VY[I] * (Vmax/L) ;
    }
    if ( L > 0 ){
      X[I] = X[I] + VX[I] ; Y[I] = Y[I] + VY[I] ;
      if ( X[I] < R ){ X[I] = R ; }
      if ( X[I] > 800-R ){ X[I] = 800-R ; }
      if ( Y[I] < R ){ Y[I] = R ; }
      if ( Y[I] > 800-R ){ Y[I] = 800-R ; }
    }
    FX[I] = 0 ; FY[I] = 0 ;
  }// I
  
} // draw()



void mousePressed(){
  
  N = N + 1 ; 
  if ( N >= Nmax ){ setup() ; }
  else{
    X[N] = mouseX ; Y[N] = mouseY ; Q[N] = Q[N-1] * (-1) ; VX[N] = 0 ; VY[N] = 0 ;
    OKNG = 1 ;
    for ( I = 0 ; I < N ; I++ ){
      L =  sqrt(((X[N]-X[I])*(X[N]-X[I]))+((Y[N]-Y[I])*(Y[N]-Y[I]))) ;
      if ( L < R ){ OKNG = 0 ; }
    }
    if ( OKNG == 0 ){ N = N - 1 ; }
  }
    
} // mousePressed()
