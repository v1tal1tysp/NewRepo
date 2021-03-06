USE [master]
GO
/****** Object:  Database [tgprbd]    Script Date: 12/08/2017 17:37:12 ******/
CREATE DATABASE [tgprbd]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'tgprbd', FILENAME = N'E:\MSSQL12.MSSQLSERVER\MSSQL\DATA\tgprbd.mdf' , SIZE = 6336KB , MAXSIZE = 256000KB , FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'tgprbd_log', FILENAME = N'E:\MSSQL12.MSSQLSERVER\MSSQL\DATA\tgprbd_log.ldf' , SIZE = 2112KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [tgprbd] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [tgprbd].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [tgprbd] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [tgprbd] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [tgprbd] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [tgprbd] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [tgprbd] SET ARITHABORT OFF 
GO
ALTER DATABASE [tgprbd] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [tgprbd] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [tgprbd] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [tgprbd] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [tgprbd] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [tgprbd] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [tgprbd] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [tgprbd] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [tgprbd] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [tgprbd] SET  ENABLE_BROKER 
GO
ALTER DATABASE [tgprbd] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [tgprbd] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [tgprbd] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [tgprbd] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [tgprbd] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [tgprbd] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [tgprbd] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [tgprbd] SET RECOVERY FULL 
GO
ALTER DATABASE [tgprbd] SET  MULTI_USER 
GO
ALTER DATABASE [tgprbd] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [tgprbd] SET DB_CHAINING OFF 
GO
ALTER DATABASE [tgprbd] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [tgprbd] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [tgprbd] SET DELAYED_DURABILITY = DISABLED 
GO
USE [tgprbd]
GO
/****** Object:  User [tgprsa]    Script Date: 12/08/2017 17:37:13 ******/
CREATE USER [tgprsa] FOR LOGIN [tgprsa] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [saha]    Script Date: 12/08/2017 17:37:13 ******/
CREATE USER [saha] FOR LOGIN [saha] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [tgprsa]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [tgprsa]
GO
/****** Object:  UserDefinedFunction [dbo].[calcAge]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[calcAge]
-- vs 1.0
(
@DOB AS DATE,
@EndDate as DATE = '2999-01-01' -- Default is today's date (see below) but any date can be used here
)
RETURNS TINYINT
AS
BEGIN
DECLARE @Result as TINYINT

-- IF DEFAULT VALUE (marked as 2999-01-01 as it doesn't accept functions) IS USED THEN USE TODAY'S DATE
IF @EndDate = '2999-01-01'
SET @EndDate = GETDATE()
IF @DOB >= @EndDate -- trap errors
SET @Result = 0
ELSE
BEGIN
-- check if the person had its birthday in the specified year and calculate age
IF (MONTH(@EndDate)*100)+DAY(@EndDate) >= (MONTH(@DOB)*100)+DAY(@DOB)
SET @Result = DATEDIFF(Year,@DOB,@EndDate)
ELSE
SET @Result = DATEDIFF(Year,@DOB,@EndDate)-1
END

RETURN @Result

END



GO
/****** Object:  UserDefinedFunction [dbo].[commaToFloat]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[commaToFloat]
-- vs 1.0
(
@text AS VARCHAR(max)
)
RETURNS float
AS
BEGIN
DECLARE @result as float

	set @result=replace(@text,',','.')

RETURN @Result

END



GO
/****** Object:  UserDefinedFunction [dbo].[DateTimeString]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[DateTimeString](@input datetime, @format as varchar(20)) RETURNS NVARCHAR(max)
-- vs 1.1
AS 
BEGIN
	DECLARE @str as varchar(max)

	if @format='dd-mm-yyyy'
	begin
		set @str=case when day(@input)<10 then '0' + Convert(varchar,day(@input)) else Convert(varchar,day(@input)) end
		set @str=@str + '-' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
		set @str=@str + '-' + Convert(varchar,year(@input))
	end
	if @format='dd.mm.yyyy'
	begin
		set @str=case when day(@input)<10 then '0' + Convert(varchar,day(@input)) else Convert(varchar,day(@input)) end
		set @str=@str + '.' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
		set @str=@str + '.' + Convert(varchar,year(@input))
	end
	if @format='dd-mm-yyyy hh:mm:ss'
	begin
		set @str=case when day(@input)<10 then '0' + Convert(varchar,day(@input)) else Convert(varchar,day(@input)) end
		set @str=@str + '-' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
		set @str=@str + '-' + Convert(varchar,year(@input))
		set @str=@str + ' ' + CONVERT(VARCHAR(8),@input,108)
	end
	if @format='dd-mm-yyyy hh(h)mm'
	begin
		set @str=case when day(@input)<10 then '0' + Convert(varchar,day(@input)) else Convert(varchar,day(@input)) end
		set @str=@str + '-' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
		set @str=@str + '-' + Convert(varchar,year(@input))
		set @str=@str + ' ' + case when datepart(hh,@input)<10 then '0' else '' end + CONVERT(VARCHAR(2),datepart(hh,@input)) 
		set @str=@str + 'h' + case when datepart(mi,@input)<10 then '0' else '' end + CONVERT(VARCHAR(2),datepart(mi,@input)) 
	end
	if @format='yyyy-mm-dd'
	begin
		set @str=Convert(varchar,year(@input))
		set @str=@str + '-' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
		set @str=@str + '-' + case when day(@input)<10 then '0' + Convert(varchar,day(@input)) else Convert(varchar,day(@input)) end
		set @str=@str + ' ' + CONVERT(VARCHAR(8),@input,108)
	end
	if @format='yyyy-mm'
	begin
		set @str=Convert(varchar,year(@input))
		set @str=@str + '-' + case when month(@input)<10 then '0' + Convert(varchar,month(@input)) else Convert(varchar,month(@input)) end
	end


	RETURN (@str)
END



GO
/****** Object:  UserDefinedFunction [dbo].[euroDate]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[euroDate]
-- vs 1.0
(
@text AS VARCHAR(max)
)
RETURNS date
AS
BEGIN
DECLARE @result as date

	if  @text<>''
	begin
		set @text=replace(@text,'/','-')
		if PATINDEX ('%-%', @text)=3
		begin
			set @text=substring(@text,7,4) + '-' + substring(@text,4,2) + '-' + left(@text,2)
		end
		else
		begin
			set @text=left(@text,4) + '-' + substring(@text,6,2) + '-' + right(@text,2)  
		end 

		set @result=Convert(date,@text)
	end
	else
	begin
		set @result=NULL
	end

RETURN @Result

END



GO
/****** Object:  UserDefinedFunction [dbo].[gnid]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[gnid]
-- vs 1.0
(
@newID as varchar(25),
@nchar AS INT
)
RETURNS float
AS
BEGIN
DECLARE @result as varchar

	set @result=left(replace(@newID,'-',''),@nchar)
	set @result=replace(@result,'E','X')
	set @result=replace(@result,'0','Y')

RETURN @Result

END



GO
/****** Object:  UserDefinedFunction [dbo].[lineBreaks]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[lineBreaks](@input varchar(max)) RETURNS NVARCHAR(max)
-- vs 1.0
AS 
BEGIN
	DECLARE @str as varchar(max)

	set @str=replace(@input, char(10), '<br />')


	RETURN (@str)
END



GO
/****** Object:  UserDefinedFunction [dbo].[NullToSpace]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[NullToSpace]
-- vs 1.0
(
@text AS VARCHAR(max)
)
RETURNS VARCHAR(max)
AS
BEGIN
DECLARE @result as VARCHAR(max)

	set @result=case when @text is null then '' else @text end

RETURN @Result

END


GO
/****** Object:  UserDefinedFunction [dbo].[nullToZero]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[nullToZero](@input bigint) RETURNS bigint
-- vs 1.0
AS 
BEGIN
	DECLARE @str as bigint

	if @input is NULL
	begin
		set @str=0
	end
	else
	begin
		set @str=@input
	end

	RETURN (@str)
END



GO
/****** Object:  UserDefinedFunction [dbo].[ProperCase]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[ProperCase](@input NVARCHAR(max)) RETURNS NVARCHAR(max)
-- vs 1.0
AS 
BEGIN
	DECLARE @position INT
	WHILE IsNull(@position,Len(@input)) > 1
	SELECT @input = Stuff(@input,IsNull(@position,1),1,upper(substring(@input,IsNull(@position,1),1))), 
	@position = charindex(' ',@input,IsNull(@position,1)) + 1
	RETURN (@input)
END



GO
/****** Object:  UserDefinedFunction [dbo].[ProperFirstCase]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[ProperFirstCase](@input NVARCHAR(max)) RETURNS NVARCHAR(max)
-- vs 1.0
AS 
BEGIN
	declare @var as varchar(max)
	set @var=convert(varchar(max), upper(substring(@input,1,1))+lower(substring(@input,2,len(@input)-1)))
	RETURN (@var)
END



GO
/****** Object:  UserDefinedFunction [dbo].[RemoveAccents]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[RemoveAccents]( @Str varchar(8000) )
-- vs 1.0
RETURNS varchar(8000)
AS
BEGIN
      /*
			VS 1.0

            EXEMPLE :
                        SELECT dbo.Format_RemoveAccents( 'ñaàeéêèioô; Œuf un œuf' )
                        ==> naaeeeeioo; OEuf un oeuf

           By Domilo
      */
      
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'à', 'a' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'á', 'a' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ó', 'o' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ò', 'o' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ú', 'u' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ù', 'u' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'í', 'i' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ì', 'i' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'é', 'e' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'è', 'e' )

      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'À', 'A' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Á', 'A' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ó', 'O' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ò', 'O' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ú', 'U' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ù', 'U' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Í', 'I' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ì', 'I' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'É', 'E' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'È', 'E' )

      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'œ', 'oe' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'æ', 'ae' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ß', 'ss' )

      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'õ', 'O' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ã', 'A' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ñ', 'N' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ê', 'E' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'â', 'A' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ç', 'C' )

      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Õ', 'o' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ã', 'a' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ñ', 'n' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ê', 'e' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Â', 'a' )
	  SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Ç', 'c' )


      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Œ', 'OE' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'Æ', 'AE' )
      SET @Str = Replace( @Str COLLATE Latin1_General_CS_AI, 'ß', 'SS' )


      RETURN @Str
END



GO
/****** Object:  UserDefinedFunction [dbo].[spaceToNull]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[spaceToNull]
-- vs 1.0
(
@text AS VARCHAR(max)
)
RETURNS VARCHAR(max)
AS
BEGIN
DECLARE @result as VARCHAR(max)

	set @result=case when rtrim(ltrim(@text))='' then NULL else @text end

RETURN @Result

END



GO
/****** Object:  UserDefinedFunction [dbo].[zeroToNull]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[zeroToNull]
-- vs 1.0
(
@number AS bigint
)
RETURNS BIGINT
AS
BEGIN
DECLARE @result as BIGINT

	set @result=case when @number=0 or @number='' then NULL else @number end

RETURN @Result

END



GO
/****** Object:  Table [dbo].[alojamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO














CREATE TABLE [dbo].[alojamento](
	[alojamentoidv] [nvarchar](20) NOT NULL,
	[orcamentoidv] [nvarchar](20) NOT NULL,
	[fornecedoridv] [nvarchar](20) NULL,
	[quartoidv] [nvarchar](20) NULL,
	[cambioidv] [nvarchar](20) NULL,
	[ivaidv] [nvarchar](20) NULL,
	[tipocustoidv] [nvarchar](20) NULL,
	[a_preco] [float] NULL,
	[a_comissao] [float] NULL,
	[a_net] [float] NULL,
	[a_valorcambio] [float] NULL,
	[a_valoreuros] [float] NULL,
	[a_numeronoites] [int] NULL,
	[a_margemvenda] [float] NULL,
	[a_markup] [float] NULL,
	[a_pagamento] [nvarchar](255) NULL,
	[a_datapagamento] [datetime] NULL,
	[a_numeroquartos] [int] NULL,
	[a_numeropessoas] [int] NULL,
	[a_valortotalpvp] [float] NULL,
	[a_valorporpessoapvp] [float] NULL,
	[a_observacoes] [nvarchar](4000) NULL,
	[a_opcao] [nvarchar](20) NULL,
 CONSTRAINT [PK_alojamento] PRIMARY KEY CLUSTERED 
(
	[alojamentoidv] ASC,
	[orcamentoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_aeroportos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_aeroportos](
	[aeroportoidv] [nvarchar](20) NOT NULL,
	[ae_sigla] [nvarchar](3) NULL,
	[ae_nome] [nvarchar](50) NULL,
	[ae_cidade] [nvarchar](50) NULL,
 CONSTRAINT [PK_aux_aeroportos] PRIMARY KEY CLUSTERED 
(
	[aeroportoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_cambios]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_cambios](
	[cambioidv] [nvarchar](20) NOT NULL,
	[c_nome] [nvarchar](3) NULL,
	[c_valor] [float] NULL,
 CONSTRAINT [PK_aux_cambios] PRIMARY KEY CLUSTERED 
(
	[cambioidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_estados]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_estados](
	[estadoidv] [nvarchar](20) NOT NULL,
	[e_nome] [nvarchar](50) NULL,
 CONSTRAINT [PK_aux_estados] PRIMARY KEY CLUSTERED 
(
	[estadoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_fornecedores]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_fornecedores](
	[fornecedoridv] [nvarchar](20) NOT NULL,
	[tipofornecedoreidv] [nvarchar](20) NOT NULL,
	[paisidv] [nvarchar](20) NULL,
	[tipocustoidv] [nvarchar](20) NULL,
	[f_nome] [nvarchar](255) NULL,
	[f_nomecomercial] [nvarchar](255) NULL,
	[f_morada] [nvarchar](255) NULL,
	[f_localidade] [nvarchar](50) NULL,
	[f_codigopostal] [nvarchar](20) NULL,
	[f_telefone] [nvarchar](20) NULL,
	[f_fax] [nvarchar](20) NULL,
	[f_telemovel] [nvarchar](20) NULL,
	[f_contacto] [nvarchar](255) NULL,
	[f_email] [nvarchar](255) NULL,
	[f_url] [nvarchar](255) NULL,
	[f_contribuinte] [nvarchar](20) NULL,
	[f_categoria] [nvarchar](2) NULL,
 CONSTRAINT [PK_aux_fornecedores] PRIMARY KEY CLUSTERED 
(
	[fornecedoridv] ASC,
	[tipofornecedoreidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_ivas]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_ivas](
	[ivaidv] [nvarchar](20) NOT NULL,
	[i_taxa] [nvarchar](10) NULL,
 CONSTRAINT [PK_aux_ivas] PRIMARY KEY CLUSTERED 
(
	[ivaidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_paises]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_paises](
	[paisidv] [nvarchar](20) NOT NULL,
	[pais_nome] [nvarchar](50) NULL,
 CONSTRAINT [PK_aux_paises] PRIMARY KEY CLUSTERED 
(
	[paisidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_quartos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_quartos](
	[quartoidv] [nvarchar](20) NOT NULL,
	[q_nome] [nvarchar](7) NULL,
 CONSTRAINT [PK_aux_quartos] PRIMARY KEY CLUSTERED 
(
	[quartoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_tipocustos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_tipocustos](
	[tipocustoidv] [nvarchar](20) NOT NULL,
	[tc_nome] [nvarchar](50) NULL,
 CONSTRAINT [PK_aux_tipocustos] PRIMARY KEY CLUSTERED 
(
	[tipocustoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_tipofornecedores]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_tipofornecedores](
	[tipofornecedoridv] [nvarchar](20) NOT NULL,
	[tf_nome] [nvarchar](50) NULL,
 CONSTRAINT [PK_aux_tipofornecedores] PRIMARY KEY CLUSTERED 
(
	[tipofornecedoridv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[aux_tiposiva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aux_tiposiva](
	[tipoivaidv] [nvarchar](20) NOT NULL,
	[ti_nome] [nvarchar](20) NULL,
 CONSTRAINT [PK_aux_tiposiva] PRIMARY KEY CLUSTERED 
(
	[tipoivaidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[diarias]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[diarias](
	[diariaidv] [nvarchar](20) NOT NULL,
	[orcamentoidv] [nvarchar](20) NOT NULL,
	[fornecedoridv] [nvarchar](20) NULL,
	[ivaidv] [nvarchar](20) NULL,
	[tipocustoidv] [nvarchar](20) NULL,
	[cambioidv] [nvarchar](20) NULL,
	[d_nomeservico] [nvarchar](50) NULL,
	[d_data] [datetime] NULL,
	[d_preco] [float] NULL,
	[d_comissao] [float] NULL,
	[d_net] [float] NULL,
	[d_valorcambio] [float] NULL,
	[d_valoreuros] [float] NULL,
	[d_quantidade] [int] NULL,
	[d_unidades] [int] NULL,
	[d_margemvenda] [float] NULL,
	[d_markup] [float] NULL,
	[d_pagamento] [nvarchar](255) NULL,
	[d_datapagamento] [datetime] NULL,
	[d_numeropessoas] [int] NULL,
	[d_valortotalpvp] [float] NULL,
	[d_valorporpessoapvp] [float] NULL,
	[d_observacoes] [nvarchar](4000) NULL,
 CONSTRAINT [PK_diarias] PRIMARY KEY CLUSTERED 
(
	[diariaidv] ASC,
	[orcamentoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orcamentos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orcamentos](
	[orcamentoidv] [nvarchar](20) NOT NULL,
	[projectoidv] [nvarchar](20) NOT NULL,
	[estadoidv] [nvarchar](20) NULL,
	[tipoivaidv] [nvarchar](20) NULL,
	[ivaidv] [nvarchar](20) NULL,
	[cambioidv] [nvarchar](20) NULL,
	[o_nome] [nvarchar](50) NULL,
	[o_datacriacao] [datetime] NULL,
	[o_datainicio] [datetime] NULL,
	[o_datafim] [datetime] NULL,
	[o_numeropessoas] [int] NULL,
	[o_numerodias] [int] NULL,
	[o_numeronoites] [int] NULL,
	[o_margemvenda] [float] NULL,
	[o_markup] [float] NULL,
	[o_descricao] [nvarchar](4000) NULL,
	[o_ordem] [int] NULL,
 CONSTRAINT [PK_orcamentos] PRIMARY KEY CLUSTERED 
(
	[orcamentoidv] ASC,
	[projectoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[projectos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[projectos](
	[projectoidv] [nvarchar](20) NOT NULL,
	[estadoidv] [nvarchar](20) NULL,
	[filettidv] [nvarchar](20) NULL,
	[sigavidv] [nvarchar](20) NULL,
	[fornecedoridv] [nvarchar](20) NULL,
	[p_nome] [nvarchar](50) NULL,
	[p_descricao] [nvarchar](4000) NULL,
 CONSTRAINT [PK_projectos] PRIMARY KEY CLUSTERED 
(
	[projectoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[servicos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[servicos](
	[servicoidv] [nvarchar](20) NOT NULL,
	[orcamentoidv] [nvarchar](20) NOT NULL,
	[fornecedoridv] [nvarchar](20) NULL,
	[ivaidv] [nvarchar](20) NULL,
	[tipocustoidv] [nvarchar](20) NULL,
	[cambioidv] [nvarchar](20) NULL,
	[servicottidv] [nvarchar](20) NULL,
	[s_nomeservico] [nvarchar](50) NULL,
	[s_preco] [float] NULL,
	[s_comissao] [float] NULL,
	[s_net] [float] NULL,
	[s_valorcambio] [float] NULL,
	[s_valoreuros] [float] NULL,
	[s_quantidade] [int] NULL,
	[s_unidades] [int] NULL,
	[s_margemvenda] [float] NULL,
	[s_markup] [float] NULL,
	[s_pagamento] [nvarchar](255) NULL,
	[s_datapagamento] [datetime] NULL,
	[s_numeropessoas] [int] NULL,
	[s_valortotalpvp] [float] NULL,
	[s_valorporpessoapvp] [float] NULL,
	[s_observacoes] [nvarchar](4000) NULL,
 CONSTRAINT [PK_servicos] PRIMARY KEY CLUSTERED 
(
	[servicoidv] ASC,
	[orcamentoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[servicostt]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[servicostt](
	[servicottidv] [nvarchar](22) NOT NULL,
	[stt_nome] [nvarchar](50) NULL,
 CONSTRAINT [PK_servicostt] PRIMARY KEY CLUSTERED 
(
	[servicottidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[voos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[voos](
	[vooidv] [nvarchar](20) NOT NULL,
	[orcamentoidv] [nvarchar](20) NOT NULL,
	[fornecedoridv] [nvarchar](20) NULL,
	[cambioidv] [nvarchar](20) NULL,
	[ivaidv] [nvarchar](20) NULL,
	[tipocustoidv] [nvarchar](20) NULL,
	[v_partida] [nvarchar](20) NULL,
	[v_destino] [nvarchar](20) NULL,
	[v_nomevoo] [nvarchar](50) NULL,
	[v_preco] [float] NULL,
	[v_comissao] [float] NULL,
	[v_net] [float] NULL,
	[v_valorcambio] [float] NULL,
	[v_valoreuros] [float] NULL,
	[v_margemvenda] [float] NULL,
	[v_markup] [float] NULL,
	[v_taxaA] [float] NULL,
	[v_taxaB] [float] NULL,
	[v_numeropessoas] [int] NULL,
	[v_disponibilidade] [int] NULL,
	[v_valortotalpvp] [float] NULL,
	[v_valorporpessoapvp] [float] NULL,
	[v_pagamento] [nvarchar](255) NULL,
	[v_datapagamento] [datetime] NULL,
 CONSTRAINT [PK_voos] PRIMARY KEY CLUSTERED 
(
	[vooidv] ASC,
	[orcamentoidv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO














/****** Object:  StoredProcedure [dbo].[deleteAeroporto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteAeroporto] 
	-- Add the parameters for the stored procedure here
	@aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_aeroportos]
	where aeroportoidv = @aeroportoidv

	select 'ok' as resposta
END




GO
/****** Object:  StoredProcedure [dbo].[deleteAlojamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteAlojamento] 
	-- Add the parameters for the stored procedure here
	@alojamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[alojamento]
	where alojamentoidv = @alojamentoidv
	
	select 'ok' as resposta
END




GO
/****** Object:  StoredProcedure [dbo].[deleteCambio]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteCambio]
	-- Add the parameters for the stored procedure here
	@cambioidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_cambios]
	where cambioidv = @cambioidv
	
	select 'ok' as resposta
END




GO
/****** Object:  StoredProcedure [dbo].[deleteDiaria]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteDiaria]
	-- Add the parameters for the stored procedure here
	@diariaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[diarias]
	where diariaidv = @diariaidv
	
	select 'ok' as resposta
END





GO
/****** Object:  StoredProcedure [dbo].[deleteEstado]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteEstado]
	-- Add the parameters for the stored procedure here
	@estadoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_estados]
	where estadoidv = @estadoidv

	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteFornecedor] 
	-- Add the parameters for the stored procedure here
	@fornecedoridv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_fornecedores]
	where fornecedoridv = @fornecedoridv
	
	select 'ok' as resposta
END



GO
/****** Object:  StoredProcedure [dbo].[deleteIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteIva]
	-- Add the parameters for the stored procedure here
	@ivaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_ivas]
	where ivaidv = @ivaidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteOrcamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteOrcamento] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[orcamentos]
	where orcamentoidv = @orcamentoidv
	
	select 'ok' as resposta
END




GO
/****** Object:  StoredProcedure [dbo].[deletePais]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deletePais]
	-- Add the parameters for the stored procedure here
	@paisidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_paises]
	where paisidv = @paisidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteProjecto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteProjecto] 
	-- Add the parameters for the stored procedure here
	@projectoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[projectos]
	where projectoidv = @projectoidv

	delete from alojamento
	where orcamentoidv in(
	
		select orcamentoidv from orcamentos 
		where projectoidv = @projectoidv
	)

	delete from voos
	where orcamentoidv in(
	
		select orcamentoidv from orcamentos 
		where projectoidv = @projectoidv
	)
	
	
	delete from servicos
	where orcamentoidv in(
	
		select orcamentoidv from orcamentos 
		where projectoidv = @projectoidv
	)
	
	delete from diarias
	where orcamentoidv in(
	
		select orcamentoidv from orcamentos 
		where projectoidv = @projectoidv
	)
	delete from orcamentos 
	where projectoidv = @projectoidv


	select 'ok' as resposta
END




GO
/****** Object:  StoredProcedure [dbo].[deleteQuarto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteQuarto]
	-- Add the parameters for the stored procedure here
	@quartoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_quartos]
	where quartoidv = @quartoidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteServico]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteServico]
	-- Add the parameters for the stored procedure here
	@servicoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[servicos]
	where servicoidv = @servicoidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteServicoTT]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteServicoTT]
	-- Add the parameters for the stored procedure here
	@servicottidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[servicostt]
	where servicottidv = @servicottidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteTipoCusto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteTipoCusto]
	-- Add the parameters for the stored procedure here
	@tipocustoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_tipocustos]
	where tipocustoidv = @tipocustoidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteTipoFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteTipoFornecedor]
	-- Add the parameters for the stored procedure here
	@tipofornecedoridv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_tipofornecedores]
	where tipofornecedoridv = @tipofornecedoridv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteTipoIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteTipoIva]
	-- Add the parameters for the stored procedure here
	@tipoivaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[aux_tiposiva]
	where tipoivaidv = @tipoivaidv
	
	select 'ok' as resposta
END






GO
/****** Object:  StoredProcedure [dbo].[deleteVoo]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deleteVoo]
	-- Add the parameters for the stored procedure here
	@vooidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE
	from [tgprbd].[dbo].[voos]
	where vooidv = @vooidv
	
	select 'ok' as resposta
END







GO
/****** Object:  StoredProcedure [dbo].[getAeroporto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAeroporto] 
	-- Add the parameters for the stored procedure here
	@aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_aeroportos]
	where aeroportoidv = @aeroportoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getAllAeroportos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllAeroportos] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_aeroportos]

END



GO
/****** Object:  StoredProcedure [dbo].[getAllAlojamentos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllAlojamentos] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [alojamento].*, f_nome, q_nome, c_nome, i_taxa, tc_nome
	from [tgprbd].[dbo].[alojamento]
	join [aux_fornecedores] on [aux_fornecedores].[fornecedoridv] = [alojamento].[fornecedoridv]
	join [aux_quartos] on [aux_quartos].[quartoidv] = [alojamento].[quartoidv]
	join [aux_cambios] on [aux_cambios].[cambioidv] = [alojamento].[cambioidv]
	join [aux_ivas] on [aux_ivas].[ivaidv] = [alojamento].[ivaidv]
	join [aux_tipocustos] on [aux_tipocustos].[tipocustoidv] = [alojamento].[tipocustoidv]
	where orcamentoidv = @orcamentoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getAllCambios]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllCambios] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_cambios]

END



GO
/****** Object:  StoredProcedure [dbo].[getAllDiarias]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllDiarias] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [diarias].*, f_nome, c_nome, i_taxa, tc_nome
	from [tgprbd].[dbo].[diarias]
	join [aux_fornecedores] on [aux_fornecedores].[fornecedoridv] = [diarias].[fornecedoridv]
	join [aux_cambios] on [aux_cambios].[cambioidv] = [diarias].[cambioidv]
	join [aux_ivas] on [aux_ivas].[ivaidv] = [diarias].[ivaidv]
	join [aux_tipocustos] on [aux_tipocustos].[tipocustoidv] = [diarias].[tipocustoidv]
	where orcamentoidv = @orcamentoidv

END




GO
/****** Object:  StoredProcedure [dbo].[getAllEstados]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllEstados] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_estados]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllFornecedores]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllFornecedores] 
	-- Add the parameters for the stored procedure here
	-- @correio as varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from [tgprbd].[dbo].[aux_fornecedores]

END


GO
/****** Object:  StoredProcedure [dbo].[getAllIvas]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllIvas] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_ivas]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllOrcamentos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllOrcamentos] 
	-- Add the parameters for the stored procedure here
	@projectoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from [tgprbd].[dbo].[orcamentos]
	where projectoidv = @projectoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getAllPaises]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllPaises] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_paises]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllProjectos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllProjectos] 
	-- Add the parameters for the stored procedure here
	-- @projectoidv as varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select forn.f_nome,
		proj.projectoidv,
			proj.filettidv,
			proj.p_nome,
			proj.p_descricao,
			proj.sigavidv,
			orc.orcamentoidv,
			orc.o_nome,
			ProjEst.e_nome as 'EstadoProjecto',
			OrcaEst.e_nome as 'EstadoOrcamento'
 from  [tgprbd].[dbo].[projectos] as proj
 join aux_fornecedores as forn on forn.fornecedoridv = proj.fornecedoridv
 join aux_estados as ProjEst on ProjEst.estadoidv = proj.estadoidv
 left join orcamentos as orc on orc.projectoidv = proj.projectoidv
 left join aux_estados as OrcaEst on OrcaEst.estadoidv = orc.estadoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getAllQuartos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllQuartos] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_quartos]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllServicos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllServicos] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [servicos].*, f_nome, c_nome, i_taxa, tc_nome, stt_nome
	from [tgprbd].[dbo].[servicos]
	join [aux_fornecedores] on [aux_fornecedores].[fornecedoridv] = [servicos].[fornecedoridv]
	join [aux_cambios] on [aux_cambios].[cambioidv] = [servicos].[cambioidv]
	join [aux_ivas] on [aux_ivas].[ivaidv] = [servicos].[ivaidv]
	join [aux_tipocustos] on [aux_tipocustos].[tipocustoidv] = [servicos].[tipocustoidv]
	join [servicostt] on [servicostt].[servicottidv] = [servicos].[servicottidv]
	where orcamentoidv = @orcamentoidv

END




GO
/****** Object:  StoredProcedure [dbo].[getAllServicosTT]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllServicosTT] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[servicostt]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllTipoCustos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllTipoCustos] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tipocustos]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllTipoFornecedores]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllTipoFornecedores] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tipofornecedores]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllTiposIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllTiposIva] 
	-- Add the parameters for the stored procedure here
	-- @aeroportoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tiposiva]

END




GO
/****** Object:  StoredProcedure [dbo].[getAllVoos]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAllVoos] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [voos].*, f_nome, c_nome, i_taxa, tc_nome
	from [tgprbd].[dbo].[voos]
	join [aux_fornecedores] on [aux_fornecedores].[fornecedoridv] = [voos].[fornecedoridv]
	join [aux_cambios] on [aux_cambios].[cambioidv] = [voos].[cambioidv]
	join [aux_ivas] on [aux_ivas].[ivaidv] = [voos].[ivaidv]
	join [aux_tipocustos] on [aux_tipocustos].[tipocustoidv] = [voos].[tipocustoidv]
	where orcamentoidv = @orcamentoidv

END




GO
/****** Object:  StoredProcedure [dbo].[getAlojamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getAlojamento] 
	-- Add the parameters for the stored procedure here
	@alojamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [alojamento].*, f_nome, q_nome, c_nome, i_taxa, tc_nome
	from [tgprbd].[dbo].[alojamento]
	join [aux_fornecedores] on [aux_fornecedores].[fornecedoridv] = [alojamento].[fornecedoridv]
	join [aux_quartos] on [aux_quartos].[quartoidv] = [alojamento].[quartoidv]
	join [aux_cambios] on [aux_cambios].[cambioidv] = [alojamento].[cambioidv]
	join [aux_ivas] on [aux_ivas].[ivaidv] = [alojamento].[ivaidv]
	join [aux_tipocustos] on [aux_tipocustos].[tipocustoidv] = [alojamento].[tipocustoidv]
	where alojamentoidv = @alojamentoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getCambio]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getCambio]
	-- Add the parameters for the stored procedure here
	@cambioidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_cambios]
	where cambioidv = @cambioidv

END



GO
/****** Object:  StoredProcedure [dbo].[getDiaria]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getDiaria]
	-- Add the parameters for the stored procedure here
	@diariaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[diarias]
	where diariaidv = @diariaidv

END




GO
/****** Object:  StoredProcedure [dbo].[getEstado]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getEstado]
	-- Add the parameters for the stored procedure here
	@estadoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_estados]
	where estadoidv = @estadoidv

END





GO
/****** Object:  StoredProcedure [dbo].[getFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getFornecedor] 
	-- Add the parameters for the stored procedure here
	@fornecedoridv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from [tgprbd].[dbo].[aux_fornecedores]
	where fornecedoridv = @fornecedoridv

END


GO
/****** Object:  StoredProcedure [dbo].[getIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getIva]
	-- Add the parameters for the stored procedure here
	@ivaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_ivas]
	where ivaidv = @ivaidv

END





GO
/****** Object:  StoredProcedure [dbo].[getOrcamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getOrcamento] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from [tgprbd].[dbo].[orcamentos]
	where orcamentoidv = @orcamentoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getPais]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getPais]
	-- Add the parameters for the stored procedure here
	@paisidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_paises]
	where paisidv = @paisidv

END





GO
/****** Object:  StoredProcedure [dbo].[getProjecto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getProjecto] 
	-- Add the parameters for the stored procedure here
	@projectoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT pro.*,
		forn.f_nome,
		forn.f_nomecomercial  from [tgprbd].[dbo].[projectos] as pro
	join aux_fornecedores as forn on forn.fornecedoridv = pro.fornecedoridv
	where projectoidv =@projectoidv

END



GO
/****** Object:  StoredProcedure [dbo].[getQuarto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getQuarto]
	-- Add the parameters for the stored procedure here
	@quartoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_quartos]
	where quartoidv = @quartoidv

END





GO
/****** Object:  StoredProcedure [dbo].[getServico]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getServico]
	-- Add the parameters for the stored procedure here
	@servicoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[servicos]
	where servicoidv = @servicoidv

END





GO
/****** Object:  StoredProcedure [dbo].[getServicoTT]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getServicoTT]
	-- Add the parameters for the stored procedure here
	@servicottidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[servicostt]
	where servicottidv = @servicottidv

END





GO
/****** Object:  StoredProcedure [dbo].[getTipoCusto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getTipoCusto]
	-- Add the parameters for the stored procedure here
	@tipocustoidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tipocustos]
	where tipocustoidv = @tipocustoidv

END





GO
/****** Object:  StoredProcedure [dbo].[getTipoFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getTipoFornecedor]
	-- Add the parameters for the stored procedure here
	@tipofornecedoridv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tipofornecedores]
	where tipofornecedoridv = @tipofornecedoridv

END





GO
/****** Object:  StoredProcedure [dbo].[getTipoIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getTipoIva]
	-- Add the parameters for the stored procedure here
	@tipoivaidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[aux_tiposiva]
	where tipoivaidv = @tipoivaidv

END





GO
/****** Object:  StoredProcedure [dbo].[getVoo]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getVoo]
	-- Add the parameters for the stored procedure here
	@vooidv as varchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	from [tgprbd].[dbo].[voos]
	where vooidv = @vooidv

END






GO
/****** Object:  StoredProcedure [dbo].[insertAeroporto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertAeroporto] 
	-- Add the parameters for the stored procedure here
	@aeroportoidv as varchar(20),
	@ae_sigla as varchar(3),
	@ae_nome as varchar(50),
	@ae_cidade as varchar(50)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@aeroportoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @aeroportoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_aeroportos] ( 
				aeroportoidv,
				ae_sigla,
				ae_nome,
				ae_cidade
			) values ( 
				@aeroportoidv,
				@ae_sigla,
				@ae_nome,
				@ae_cidade
			)

			select * from [tgprbd].[dbo].[aux_aeroportos]
			where aeroportoidv = @aeroportoidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_aeroportos] set
				ae_sigla = @ae_sigla,
				ae_nome = @ae_nome,
				ae_cidade = @ae_cidade
			where aeroportoidv = @aeroportoidv

			select * from [tgprbd].[dbo].[aux_aeroportos]
			where aeroportoidv = @aeroportoidv

		end

END



GO
/****** Object:  StoredProcedure [dbo].[insertAlojamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertAlojamento] 
	-- Add the parameters for the stored procedure here
	@alojamentoidv as varchar(20),
	@orcamentoidv as varchar(20),
	@fornecedoridv as varchar(20),
	@quartoidv as varchar(20),
	@cambioidv as varchar(20),
	@ivaidv as varchar(20),
	@tipocustoidv as varchar(20),
	@a_preco as float,
	@a_comissao as float,
	@a_net as float,
	@a_valorcambio as float,
	@a_valoreuros as float,
	@a_numeronoites as tinyint,
	@a_margemvenda as float,
	@a_markup as float,
	@a_pagamento as varchar(255),
	@a_datapagamento as datetime,
	@a_numeroquartos as tinyint,
	@a_numeropessoas as tinyint,
	@a_valortotalpvp as float,
	@a_valorporpessoapvp as float,
	@a_observacoes as varchar(4000),
	@a_opcao as varchar(20)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@alojamentoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @alojamentoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[alojamento] ( 
				alojamentoidv,
				orcamentoidv,
				fornecedoridv,
				quartoidv,
				cambioidv,
				ivaidv,
				tipocustoidv,
				a_preco,
				a_comissao,
				a_net,
				a_valorcambio,
				a_valoreuros,
				a_numeronoites,
				a_margemvenda,
				a_markup,
				a_pagamento,
				a_datapagamento,
				a_numeroquartos,
				a_numeropessoas,
				a_valortotalpvp,
				a_valorporpessoapvp,
				a_observacoes,
				a_opcao
			) values ( 
				@alojamentoidv,
				@orcamentoidv,
				@fornecedoridv,
				@quartoidv,
				@cambioidv,
				@ivaidv,
				@tipocustoidv,
				@a_preco,
				@a_comissao,
				@a_net,
				@a_valorcambio,
				@a_valoreuros,
				@a_numeronoites,
				@a_margemvenda,
				@a_markup,
				@a_pagamento,
				@a_datapagamento,
				@a_numeroquartos,
				@a_numeropessoas,
				@a_valortotalpvp,
				@a_valorporpessoapvp,
				@a_observacoes,
				@a_opcao
			)

			select * from [tgprbd].[dbo].[alojamento]
			where alojamentoidv = @alojamentoidv

		end

	else
		begin

			update [tgprbd].[dbo].[alojamento] set
				orcamentoidv = @orcamentoidv,
				fornecedoridv = @fornecedoridv,
				quartoidv = @quartoidv,
				cambioidv = @cambioidv,
				ivaidv = @ivaidv,
				tipocustoidv = @tipocustoidv,
				a_preco = @a_preco,
				a_comissao = @a_comissao,
				a_net = @a_net,
				a_valorcambio = @a_valorcambio,
				a_valoreuros = @a_valoreuros,
				a_numeronoites = @a_numeronoites,
				a_margemvenda = @a_margemvenda,
				a_markup = @a_markup,
				a_pagamento = @a_pagamento,
				a_datapagamento = @a_datapagamento,
				a_numeroquartos = @a_numeroquartos,
				a_numeropessoas = @a_numeropessoas,
				a_valortotalpvp = @a_valortotalpvp,
				a_valorporpessoapvp = @a_valorporpessoapvp,
				a_observacoes = @a_observacoes,
				a_opcao = @a_opcao 
			where alojamentoidv = @alojamentoidv

			select * from [tgprbd].[dbo].[alojamento]
			where alojamentoidv = @alojamentoidv

		end

END



GO
/****** Object:  StoredProcedure [dbo].[insertCambio]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertCambio] 
	-- Add the parameters for the stored procedure here
	@cambioidv as varchar(20),
	@c_nome as varchar(3),
	@c_valor as float
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@cambioidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @cambioidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_cambios] ( 
				cambioidv,
				c_nome,
				c_valor
			) values ( 
				@cambioidv,
				@c_nome,
				@c_valor
			)

			select * from [tgprbd].[dbo].[aux_cambios]
			where cambioidv = @cambioidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_cambios] set
				c_nome = @c_nome,
				c_valor = @c_valor
			where cambioidv = @cambioidv

			select * from [tgprbd].[dbo].[aux_cambios]
			where cambioidv = @cambioidv

		end

END



GO
/****** Object:  StoredProcedure [dbo].[insertDiaria]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertDiaria] 
	-- Add the parameters for the stored procedure here
	@diariaidv as varchar(20),
	@orcamentoidv as varchar(20),
	@fornecedoridv as varchar(20),
	@ivaidv as varchar(20),
	@tipocustoidv as varchar(20),
	@cambioidv as varchar(20),
	@d_nomeservico as varchar(50),
	@d_data as datetime,
	@d_preco as float,
	@d_comissao as float,
	@d_net as float,
	@d_valorcambio as float,
	@d_valoreuros as float,
	@d_quantidade as tinyint,
	@d_unidades as tinyint,
	@d_margemvenda as float,
	@d_markup as float,
	@d_pagamento as varchar(255),
	@d_datapagamento as datetime,
	@d_numeropessoas as tinyint,
	@d_valortotalpvp as float,
	@d_valorporpessoapvp as float,
	@d_observacoes as varchar(4000)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@diariaidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @diariaidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[diarias] ( 
				diariaidv,
				orcamentoidv,
				fornecedoridv,
				ivaidv,
				tipocustoidv,
				cambioidv,
				d_nomeservico,
				d_data,
				d_preco,
				d_comissao,
				d_net,
				d_valorcambio,
				d_valoreuros,
				d_quantidade,
				d_unidades,
				d_margemvenda,
				d_markup,
				d_pagamento,
				d_datapagamento,
				d_numeropessoas,
				d_valortotalpvp,
				d_valorporpessoapvp,
				d_observacoes
			) values ( 
				@diariaidv,
				@orcamentoidv,
				@fornecedoridv,
				@ivaidv,
				@tipocustoidv,
				@cambioidv,
				@d_nomeservico,
				@d_data,
				@d_preco,
				@d_comissao,
				@d_net,
				@d_valorcambio,
				@d_valoreuros,
				@d_quantidade,
				@d_unidades,
				@d_margemvenda,
				@d_markup,
				@d_pagamento,
				@d_datapagamento,
				@d_numeropessoas,
				@d_valortotalpvp,
				@d_valorporpessoapvp,
				@d_observacoes
			)

			select * from [tgprbd].[dbo].[diarias]
			where diariaidv = @diariaidv

		end

	else
		begin

			update [tgprbd].[dbo].[diarias] set
				orcamentoidv = @orcamentoidv,
				fornecedoridv = @fornecedoridv,
				ivaidv = @ivaidv,
				tipocustoidv = @tipocustoidv,
				cambioidv = @cambioidv,
				d_nomeservico = @d_nomeservico,
				d_data = @d_data,
				d_preco = @d_preco,
				d_comissao = @d_comissao,
				d_net = @d_net,
				d_valorcambio = @d_valorcambio,
				d_valoreuros = @d_valoreuros,
				d_quantidade = @d_quantidade,
				d_unidades = @d_unidades,
				d_margemvenda = @d_margemvenda,
				d_markup = @d_markup,
				d_pagamento = @d_pagamento,
				d_datapagamento = @d_datapagamento,
				d_numeropessoas = @d_numeropessoas,
				d_valortotalpvp = @d_valortotalpvp,
				d_valorporpessoapvp = @d_valorporpessoapvp,
				d_observacoes = @d_observacoes
			where diariaidv = @diariaidv

			select * from [tgprbd].[dbo].[diarias]
			where diariaidv = @diariaidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertEstado]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertEstado]
	-- Add the parameters for the stored procedure here
	@estadoidv as varchar(20),
	@e_nome as varchar(50)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@estadoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @estadoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_estados] ( 
				estadoidv,
				e_nome
			) values ( 
				@estadoidv,
				@e_nome
			)

			select * from [tgprbd].[dbo].[aux_estados]
			where estadoidv = @estadoidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_estados] set
				e_nome = @e_nome
			where estadoidv = @estadoidv

			select * from [tgprbd].[dbo].[aux_estados]
			where estadoidv = @estadoidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertFornecedor] 
	-- Add the parameters for the stored procedure here
	@fornecedoridv as varchar(20),
	@tipofornecedoreidv as varchar(20),
	@paisidv as varchar(20),
	@tipocustoidv as varchar(20),
	@f_nome as varchar(255),
	@f_nomecomercial as varchar(255),
	@f_morada as varchar(255),
	@f_localidade as varchar(50),
	@f_codigopostal as varchar(20),
	@f_telefone as varchar(20),
	@f_fax as varchar(20),
	@f_telemovel as varchar(20),
	@f_contacto as varchar(255),
	@f_email as varchar(255),
	@f_url as varchar(255),
	@f_contribuinte as varchar(20),
	@f_categoria as varchar(2)


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	if (@fornecedoridv = '')

		begin
			-- declare @projectoidv as varchar(20)

			set @fornecedoridv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_fornecedores] ( 
				fornecedoridv,
				tipofornecedoreidv,
				paisidv,
				tipocustoidv,
				f_nome,
				f_nomecomercial,
				f_morada,
				f_localidade,
				f_codigopostal,
				f_telefone,
				f_fax,
				f_telemovel,
				f_contacto,
				f_email,
				f_url,
				f_contribuinte,
				f_categoria
			) values ( 
				@fornecedoridv,
				@tipofornecedoreidv,
				@paisidv,
				@tipocustoidv,
				@f_nome,
				@f_nomecomercial,
				@f_morada,
				@f_localidade,
				@f_codigopostal,
				@f_telefone,
				@f_fax,
				@f_telemovel,
				@f_contacto,
				@f_email,
				@f_url,
				@f_contribuinte,
				@f_categoria
			)

			select * from [tgprbd].[dbo].[aux_fornecedores]
			where fornecedoridv = @fornecedoridv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_fornecedores] set
				tipofornecedoreidv = @tipofornecedoreidv,
				paisidv = @paisidv,
				tipocustoidv = @tipocustoidv,
				f_nome = @f_nome,
				f_nomecomercial = @f_nomecomercial,
				f_morada = @f_morada,
				f_localidade = @f_localidade,
				f_codigopostal = @f_codigopostal,
				f_telefone = @f_telefone,
				f_fax = @f_fax,
				f_telemovel = @f_telemovel,
				f_contacto = @f_contacto,
				f_email = @f_email,
				f_url = @f_url,
				f_contribuinte = @f_contribuinte,
				f_categoria = @f_categoria
			where fornecedoridv = @fornecedoridv


			select * from [tgprbd].[dbo].[aux_fornecedores]
			where fornecedoridv = @fornecedoridv

		end



END



GO
/****** Object:  StoredProcedure [dbo].[insertIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertIva]
	-- Add the parameters for the stored procedure here
	@ivaidv as varchar(20),
	@i_taxa as varchar(10)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@ivaidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @ivaidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_ivas] ( 
				ivaidv,
				i_taxa
			) values ( 
				@ivaidv,
				@i_taxa
			)

			select * from [tgprbd].[dbo].[aux_ivas]
			where ivaidv = @ivaidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_ivas] set
				i_taxa = @i_taxa
			where ivaidv = @ivaidv

			select * from [tgprbd].[dbo].[aux_ivas]
			where ivaidv = @ivaidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertOrcamento]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertOrcamento] 
	-- Add the parameters for the stored procedure here
	@orcamentoidv as varchar(20),
	@projectoidv as varchar(20),
	@estadoidv as varchar(20),
	@tipoivaidv as varchar(20),
	@ivaidv as varchar(20),
	@cambioidv as varchar(20),
	@o_nome as varchar(50),
	@o_datacriacao as datetime,
	@o_datainicio as datetime,
	@o_datafim as datetime,
	@o_numeropessoas as tinyint,
	@o_numerodias as tinyint,
	@o_numeronoites as tinyint,
	@o_margemvenda as tinyint,
	@o_markup as tinyint,
	@o_descricao as varchar(4000),
	@o_ordem as int
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@orcamentoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @orcamentoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[orcamentos] ( 
				orcamentoidv,
				projectoidv,
				estadoidv,
				tipoivaidv,
				ivaidv,
				cambioidv,
				o_nome,
				o_datacriacao,
				o_datainicio,
				o_datafim,
				o_numeropessoas,
				o_numerodias,
				o_numeronoites,
				o_margemvenda,
				o_markup,
				o_descricao,
				o_ordem
			) values ( 
				@orcamentoidv,
				@projectoidv,
				@estadoidv,
				@tipoivaidv,
				@ivaidv,
				@cambioidv,
				@o_nome,
				@o_datacriacao,
				@o_datainicio,
				@o_datafim,
				@o_numeropessoas,
				@o_numerodias,
				@o_numeronoites,
				@o_margemvenda,
				@o_markup,
				@o_descricao,
				@o_ordem
			)

			select * from [tgprbd].[dbo].[orcamentos]
			where orcamentoidv = @orcamentoidv

		end

	else
		begin

			update [tgprbd].[dbo].[orcamentos] set
				projectoidv = @projectoidv,
				estadoidv = @estadoidv,
				tipoivaidv = @tipoivaidv,
				ivaidv = @ivaidv,
				cambioidv = @cambioidv,
				o_nome = @o_nome,
				o_datacriacao = @o_datacriacao,
				o_datainicio = @o_datainicio,
				o_datafim = @o_datafim,
				o_numeropessoas = @o_numeropessoas,
				o_numerodias = @o_numerodias,
				o_numeronoites = @o_numeronoites,
				o_margemvenda = @o_margemvenda,
				o_markup = @o_markup,
				o_descricao = @o_descricao,
				o_ordem = @o_ordem 
			where orcamentoidv = @orcamentoidv

			select * from [tgprbd].[dbo].[orcamentos]
			where orcamentoidv = @orcamentoidv

		end

END



GO
/****** Object:  StoredProcedure [dbo].[insertPais]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertPais]
	-- Add the parameters for the stored procedure here
	@paisidv as varchar(20),
	@pais_nome as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@paisidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @paisidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_paises] ( 
				paisidv,
				pais_nome
			) values ( 
				@paisidv,
				@pais_nome
			)

			select * from [tgprbd].[dbo].[aux_paises]
			where paisidv = @paisidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_paises] set
				pais_nome = @pais_nome
			where paisidv = @paisidv

			select * from [tgprbd].[dbo].[aux_paises]
			where paisidv = @paisidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertProjecto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertProjecto] 
	-- Add the parameters for the stored procedure here
	@projectoidv as varchar(20),
	@estadoidv as varchar(20),
	@filettidv as varchar(20),
	@sigavidv as varchar(20),
	@fornecedoridv as varchar(20),
	@p_nome as varchar(50),
	@p_descricao as varchar(4000)

 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@projectoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @projectoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[projectos] ( 
				projectoidv,
				estadoidv,
				filettidv,
				sigavidv,
				fornecedoridv,
				p_nome,
				p_descricao
			) values ( 
				@projectoidv,
				@estadoidv,
				@filettidv,
				@sigavidv,
				@fornecedoridv,
				@p_nome,
				@p_descricao
			)

			select * from [tgprbd].[dbo].[projectos]
			where projectoidv = @projectoidv

		end

	else
		begin

			update [tgprbd].[dbo].[projectos] set
				estadoidv = @estadoidv,
				filettidv = @filettidv,
				sigavidv = @sigavidv,
				fornecedoridv = @fornecedoridv,
				p_nome = @p_nome,
				p_descricao = @p_descricao
			where projectoidv = @projectoidv

			select * from [tgprbd].[dbo].[projectos]
			where projectoidv = @projectoidv

		end





END



GO
/****** Object:  StoredProcedure [dbo].[insertQuarto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertQuarto]
	-- Add the parameters for the stored procedure here
	@quartoidv as varchar(20),
	@q_nome as varchar(7)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@quartoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @quartoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_quartos] ( 
				quartoidv,
				q_nome
			) values ( 
				@quartoidv,
				@q_nome
			)

			select * from [tgprbd].[dbo].[aux_quartos]
			where quartoidv = @quartoidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_quartos] set
				q_nome = @q_nome
			where quartoidv = @quartoidv

			select * from [tgprbd].[dbo].[aux_quartos]
			where quartoidv = @quartoidv

		end

END





GO
/****** Object:  StoredProcedure [dbo].[insertServico]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertServico]
	-- Add the parameters for the stored procedure here
	@servicoidv as varchar(20),
	@orcamentoidv as varchar(20),
	@fornecedoridv as varchar(20),
	@ivaidv as varchar(20),
	@tipocustoidv as varchar(20),
	@cambioidv as varchar(20),
	@servicottidv as varchar(20),
	@s_nomeservico as varchar(50),
	@s_preco as float,
	@s_comissao as float,
	@s_net as float,
	@s_valorcambio as float,
	@s_valoreuros as float,
	@s_quantidade as tinyint,
	@s_unidades as tinyint,
	@s_margemvenda as float,
	@s_markup as float,
	@s_pagamento as varchar(255),
	@s_datapagamento as datetime,
	@s_numeropessoas as tinyint,
	@s_valortotalpvp as float,
	@s_valorporpessoapvp as float,
	@s_observacoes as varchar(4000)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@servicoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @servicoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[servicos] ( 
				servicoidv,
				orcamentoidv,
				fornecedoridv,
				ivaidv,
				tipocustoidv,
				cambioidv,
				servicottidv,
				s_nomeservico,
				s_preco,
				s_comissao,
				s_net,
				s_valorcambio,
				s_valoreuros,
				s_quantidade,
				s_unidades,
				s_margemvenda,
				s_markup,
				s_pagamento,
				s_datapagamento,
				s_numeropessoas,
				s_valortotalpvp,
				s_valorporpessoapvp,
				s_observacoes
			) values ( 
				@servicoidv,
				@orcamentoidv,
				@fornecedoridv,
				@ivaidv,
				@tipocustoidv,
				@cambioidv,
				@servicottidv,
				@s_nomeservico,
				@s_preco,
				@s_comissao,
				@s_net,
				@s_valorcambio,
				@s_valoreuros,
				@s_quantidade,
				@s_unidades,
				@s_margemvenda,
				@s_markup,
				@s_pagamento,
				@s_datapagamento,
				@s_numeropessoas,
				@s_valortotalpvp,
				@s_valorporpessoapvp,
				@s_observacoes
			)

			select * from [tgprbd].[dbo].[servicos]
			where servicoidv = @servicoidv

		end

	else
		begin

			update [tgprbd].[dbo].[servicos] set
				orcamentoidv = @orcamentoidv,
				fornecedoridv = @fornecedoridv,
				ivaidv = @ivaidv,
				tipocustoidv = @tipocustoidv,
				cambioidv = @cambioidv,
				servicottidv = @servicottidv,
				s_nomeservico = @s_nomeservico,
				s_preco = @s_preco,
				s_comissao = @s_comissao,
				s_net = @s_net,
				s_valorcambio = @s_valorcambio,
				s_valoreuros = @s_valoreuros,
				s_quantidade = @s_quantidade,
				s_unidades = @s_unidades,
				s_margemvenda = @s_margemvenda,
				s_markup = @s_markup,
				s_pagamento = @s_pagamento,
				s_datapagamento = @s_datapagamento,
				s_numeropessoas = @s_numeropessoas,
				s_valortotalpvp = @s_valortotalpvp,
				s_valorporpessoapvp = @s_valorporpessoapvp,
				s_observacoes = @s_observacoes
			where servicoidv = @servicoidv

			select * from [tgprbd].[dbo].[servicos]
			where servicoidv = @servicoidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertServicoTT]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertServicoTT]
	-- Add the parameters for the stored procedure here
	@servicottidv as varchar(20),
	@stt_nome as varchar(50)
 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@servicottidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @servicottidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[servicostt] ( 
				servicottidv,
				stt_nome
			) values ( 
				@servicottidv,
				@stt_nome
			)

			select * from [tgprbd].[dbo].[servicostt]
			where servicottidv = @servicottidv

		end

	else
		begin

			update [tgprbd].[dbo].[servicostt] set
				stt_nome = @stt_nome
			where servicottidv = @servicottidv

			select * from [tgprbd].[dbo].[servicostt]
			where servicottidv = @servicottidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertTipoCusto]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertTipoCusto]
	-- Add the parameters for the stored procedure here
	@tipocustoidv as varchar(20),
	@tc_nome as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@tipocustoidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @tipocustoidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_tipocustos] ( 
				tipocustoidv,
				tc_nome
			) values ( 
				@tipocustoidv,
				@tc_nome
			)

			select * from [tgprbd].[dbo].[aux_tipocustos]
			where tipocustoidv = @tipocustoidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_tipocustos] set
				tc_nome = @tc_nome
			where tipocustoidv = @tipocustoidv

			select * from [tgprbd].[dbo].[aux_tipocustos]
			where tipocustoidv = @tipocustoidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertTipoFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertTipoFornecedor]
	-- Add the parameters for the stored procedure here
	@tipofornecedoridv as varchar(20),
	@tf_nome as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@tipofornecedoridv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @tipofornecedoridv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_tipofornecedores] ( 
				tipofornecedoridv,
				tf_nome
			) values ( 
				@tipofornecedoridv,
				@tf_nome
			)

			select * from [tgprbd].[dbo].[aux_tipofornecedores]
			where tipofornecedoridv = @tipofornecedoridv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_tipofornecedores] set
				tf_nome = @tf_nome
			where tipofornecedoridv = @tipofornecedoridv

			select * from [tgprbd].[dbo].[aux_tipofornecedores]
			where tipofornecedoridv = @tipofornecedoridv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertTipoIva]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertTipoIva]
	-- Add the parameters for the stored procedure here
	@tipoivaidv as varchar(20),
	@ti_nome as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@tipoivaidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @tipoivaidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[aux_tiposiva] ( 
				tipoivaidv,
				ti_nome
			) values ( 
				@tipoivaidv,
				@ti_nome
			)

			select * from [tgprbd].[dbo].[aux_tiposiva]
			where tipoivaidv = @tipoivaidv

		end

	else
		begin

			update [tgprbd].[dbo].[aux_tiposiva] set
				ti_nome = @ti_nome
			where tipoivaidv = @tipoivaidv

			select * from [tgprbd].[dbo].[aux_tiposiva]
			where tipoivaidv = @tipoivaidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[insertVoo]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertVoo]
	-- Add the parameters for the stored procedure here
	@vooidv as varchar(20),
	@orcamentoidv as varchar(20),
	@fornecedoridv as varchar(20),
	@cambioidv as varchar(20),
	@ivaidv as varchar(20),
	@tipocustoidv as varchar(20),
	@v_partida as varchar(20),
	@v_destino as varchar(20),
	@v_nomevoo as varchar(50),
	@v_preco as float,
	@v_comissao as float,
	@v_net as float,
	@v_valorcambio as float,
	@v_valoreuros as float,
	@v_margemvenda as float,
	@v_markup as float,
	@v_taxaA as float,
	@v_taxaB as float,
	@v_numeropessoas as tinyint,
	@v_disponibilidade as tinyint,
	@v_valortotalpvp as float,
	@v_valorporpessoapvp as float,
	@v_pagamento as varchar(255),
	@v_datapagamento as datetime



AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if (@vooidv = '')

		begin
		
			-- declare @projectoidv as varchar(20)

			set @vooidv = left(replace(newid(),'-',''),20)

			-- Insert statements for procedure here
			insert into [tgprbd].[dbo].[voos] ( 
				vooidv,
				orcamentoidv,
				fornecedoridv,
				cambioidv,
				ivaidv,
				tipocustoidv,
				v_partida,
				v_destino,
				v_nomevoo,
				v_preco,
				v_comissao,
				v_net,
				v_valorcambio,
				v_valoreuros,
				v_margemvenda,
				v_markup,
				v_taxaA,
				v_taxaB,
				v_numeropessoas,
				v_disponibilidade,
				v_valortotalpvp,
				v_valorporpessoapvp,
				v_pagamento,
				v_datapagamento
			) values ( 
				@vooidv,
				@orcamentoidv,
				@fornecedoridv,
				@cambioidv,
				@ivaidv,
				@tipocustoidv,
				@v_partida,
				@v_destino,
				@v_nomevoo,
				@v_preco,
				@v_comissao,
				@v_net,
				@v_valorcambio,
				@v_valoreuros,
				@v_margemvenda,
				@v_markup,
				@v_taxaA,
				@v_taxaB,
				@v_numeropessoas,
				@v_disponibilidade,
				@v_valortotalpvp,
				@v_valorporpessoapvp,
				@v_pagamento,
				@v_datapagamento
			)

			select * from [tgprbd].[dbo].[voos]
			where vooidv = @vooidv

		end

	else
		begin

			update [tgprbd].[dbo].[voos] set
				orcamentoidv = @orcamentoidv,
				fornecedoridv = @fornecedoridv,
				cambioidv = @cambioidv,
				ivaidv = @ivaidv,
				tipocustoidv = @tipocustoidv,
				v_partida = @v_partida,
				v_destino = @v_destino,
				v_nomevoo = @v_nomevoo,
				v_preco = @v_preco,
				v_comissao = @v_comissao,
				v_net = @v_net,
				v_valorcambio = @v_valorcambio,
				v_valoreuros = @v_valoreuros,
				v_margemvenda = @v_margemvenda,
				v_markup = @v_markup,
				v_taxaA = @v_taxaA,
				v_taxaB = @v_taxaB,
				v_numeropessoas = @v_numeropessoas,
				v_disponibilidade = @v_disponibilidade,
				v_valortotalpvp = @v_valortotalpvp,
				v_valorporpessoapvp = @v_valorporpessoapvp,
				v_pagamento = @v_pagamento,
				v_datapagamento = @v_datapagamento
			where vooidv = @vooidv

			select * from [tgprbd].[dbo].[voos]
			where vooidv = @vooidv

		end

END




GO
/****** Object:  StoredProcedure [dbo].[pesquisaFornecedor]    Script Date: 12/08/2017 17:37:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[pesquisaFornecedor] 
	-- Add the parameters for the stored procedure here
	@pesquisa as varchar(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [fornecedoridv], [f_nome]  ,[f_nomecomercial] 
	from [tgprbd].[dbo].[aux_fornecedores]
	where f_nome like '%' + @pesquisa + '%' or f_nomecomercial like '%' + @pesquisa + '%'

END



GO
USE [master]
GO
ALTER DATABASE [tgprbd] SET  READ_WRITE 
GO
