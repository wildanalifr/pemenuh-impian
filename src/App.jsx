import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function App() {
  const [form, setForm] = useState({
    targetDana: '',
    danaTersedia: '',
    jangkaWaktuInvestasi: '',
    asumsiTingkatPertumbuhan: '',
  })

  const [hasil, setHasil] = useState({
    profit: '',
    danaInvestXTahun: '',
    simpananDanaXTahun: '',
    kekuranganDana: '',
    danaSimpananPerBulan: '',
  })

  const [hitung, setHitung] = useState(false)

  //handle
  const handleChange = (e) => {
    let { value, name } = e.target
    setForm({ ...form, [name]: Number(value) })
  }

  const perhitungan = () => {
    let profit = form.asumsiTingkatPertumbuhan / 100
    hasil.profit = form.danaTersedia * profit

    let danaInvest = hasil.profit * form.jangkaWaktuInvestasi
    hasil.danaInvestXTahun = form.danaTersedia * form.jangkaWaktuInvestasi + danaInvest

    let simpananDana = hasil.profit * form.jangkaWaktuInvestasi
    hasil.simpananDanaXTahun = hasil.danaInvestXTahun - simpananDana
    hasil.kekuranganDana = hasil.simpananDanaXTahun - form.danaTersedia

    let danaSimpanan = hasil.kekuranganDana / form.jangkaWaktuInvestasi
    hasil.danaSimpananPerBulan = danaSimpanan / form.jangkaWaktuInvestasi

    setHasil({ ...hasil })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setHitung(true)
    perhitungan()
  }

  const resetAll = () => {
    form.targetDana = ''
    form.danaTersedia = ''
    form.jangkaWaktuInvestasi = ''
    form.asumsiTingkatPertumbuhan = ''
    setForm({ ...form })

    hasil.profit = ''
    hasil.danaInvestXTahun = ''
    hasil.simpananDanaXTahun = ''
    hasil.kekuranganDana = ''
    hasil.danaSimpananPerBulan = ''
    setHasil({ ...hasil })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setHitung(false)
    resetAll()
  }

  return (
    <div style={{ margin: '20px' }}>
      <Row>
        <Col md={6}>
          <Card style={{ padding: '10px' }}>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row className="d-flex align-items-center">
                  <Col>
                    <Form.Label>Target Dana Investasi Yang Anda Inginkan</Form.Label>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control type="text" name="targetDana" value={form.targetDana} onChange={handleChange} placeholder="Target dana" />
                      <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row className="d-flex align-items-center">
                  <Col>
                    <Form.Label>Dana Tersedia</Form.Label>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control type="text" name="danaTersedia" value={form.danaTersedia} onChange={handleChange} placeholder="Dana Tersedia" />
                      <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row className="d-flex align-items-center">
                  <Col>
                    <Form.Label>Jangka Waktu investasi</Form.Label>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        name="jangkaWaktuInvestasi"
                        value={form.jangkaWaktuInvestasi}
                        onChange={handleChange}
                        placeholder="Jangka waktu investasi"
                      />
                      <InputGroup.Text id="basic-addon2">Tahun</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row className="d-flex align-items-center">
                  <Col>
                    <Form.Label>Asumsi Tingkat Pertumbuhan Investasi</Form.Label>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        name="asumsiTingkatPertumbuhan"
                        value={form.asumsiTingkatPertumbuhan}
                        onChange={handleChange}
                        placeholder="Asumsi Tingkat Pertumbuhan Investasi"
                      />
                      <InputGroup.Text id="basic-addon2">%/Tahun</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Hitung
                  </Button>
                </Col>
              </Row>
            </form>
          </Card>
        </Col>

        {hitung && (
          <Col>
            <form onSubmit={handleReset}>
              <Card style={{ padding: '10px' }}>
                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col>
                      <Form.Label>Profit</Form.Label>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control disabled type="text" value={hasil.profit} />
                        <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col>
                      <Form.Label>Dana Investasi selama {form.jangkaWaktuInvestasi} tahun</Form.Label>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control disabled type="text" value={hasil.danaInvestXTahun} />
                        <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col>
                      <Form.Label>Simpanan Dana selama {form.jangkaWaktuInvestasi} tahun</Form.Label>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control disabled type="text" value={hasil.simpananDanaXTahun} />
                        <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Row className="d-flex align-items-center">
                      <Col>
                        <Form.Label>Kekurangan Dana</Form.Label>
                      </Col>
                      <Col>
                        <InputGroup className="mb-3">
                          <Form.Control disabled type="text" value={hasil.kekuranganDana} />
                          <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row className="d-flex align-items-center">
                    <Col>
                      <Form.Label>Dana simpanan / bulan</Form.Label>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control disabled type="text" value={hasil.danaSimpananPerBulan} />
                        <InputGroup.Text id="basic-addon2">IDR</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Card>
            </form>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default App
